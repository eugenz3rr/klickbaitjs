<template>
  <div class="tile-audio-editor">
    <h2>Crop Audio</h2>
    <v-toolbar color="secondary">
      <v-btn v-if="state === 'pause'" icon @click="play">
        <v-icon color="accent">play_arrow</v-icon>
      </v-btn>
      <v-btn v-if="state === 'play'" icon @click="pause">
        <v-icon color="accent">pause</v-icon>
      </v-btn>
      <v-btn icon @click="stop">
        <v-icon color="accent">stop</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="cursor !== 'cursor'" icon @click="statechange('cursor')">
        <v-icon color="accent">my_location</v-icon>
      </v-btn>
      <v-btn v-if="cursor !== 'shift'" icon @click="statechange('shift')">
        <v-icon color="accent">open_with</v-icon>
      </v-btn>

      <v-btn v-if="cursor !== 'select'" icon @click="statechange('select')">
        <v-icon color="accent">select_all</v-icon>
      </v-btn>
    </v-toolbar>

    <v-slider
        v-if="Playlist"
        color="accent"
        thumb-color="accent"
        track-fill-color="accent"
        class="audio-editor-item"
        append-icon="volume_up"
        prepend-icon="volume_down"
        v-model="MasterVolume"
        :min="1"
        :max="100"
        label="Volume"
        hint="Change the volume of the played tile."
        persistent-hint
    />

    <div id="playlist"></div>

    <v-slider
        v-if="Playlist && cursor === 'cursor'"
        class="audio-editor-item extra"
        v-model="CursorPosition"
        color="accent"
        thumb-color="accent"
        track-fill-color="accent"
        :min="0"
        :max="this.CursorPositionMax"
        :step="0.1"
        label="Cursor"
        hint="Set the cursor at the position you want to start playing from."
        thumb-label="always"
        persistent-hint
    />

    <v-range-slider
        v-if="Playlist && cursor === 'select'"
        class="audio-editor-item extra"
        v-model="SelectionSegment"
        color="accent"
        thumb-color="accent"
        track-fill-color="accent"
        :min="0"
        :max="this.SelectionSegmentMax"
        :step="stepSize"
        label="Select"
        hint="Select the section you want to cut."
        thumb-label="always"
        persistent-hint
    />

    <v-btn v-if="Playlist && cursor === 'select'" block depressed @click="trim" color="secondary">Trim</v-btn>

    <v-toolbar v-if="cursor === 'shift'" class="audio-editor-item" color="secondary">
      <v-btn icon @click="alignLeft">
        <v-icon color="accent">format_align_left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="moveLeft">
        <v-icon color="accent">chevron_left</v-icon>
      </v-btn>
      <v-btn icon @click="moveRight">
        <v-icon color="accent">chevron_right</v-icon>
      </v-btn>
    </v-toolbar>

    <v-btn v-if="Playlist" class="audio-editor-item" block tile @click="save" color="success">Save</v-btn>
    <v-btn class="audio-editor-item" block tile color="error" @click="leave">Cancel</v-btn>
  </div>
</template>

<script>
import { Helper } from "../../../main";
import WaveformPlaylist from "../../../../../../.repositories/waveform-playlist/lib/app";

export default {
  name: "AudioEditor",
  data() {
    return {
      window,

      /** @type {Document} */
      document,
      Helper,

      /** @type {Common.Settings} */
      settings: Helper.settings,

      state: "pause",
      cursor: "cursor",
      stepSize: 0.1,
      trimmed: [0, 0],
      MasterVolume: 50,
      CursorPosition: 0,
      CursorPositionMax: 0,
      SelectionSegment: [0, 0],
      Playlist: null,
      EventEmiter: null,
      WaveformPlaylist,
      file: this._file
    };
  },
  props: {
    _file: File,
    _file: Blob
  },
  watch: {
    MasterVolume: function (val) {
      if (val && this.Playlist) {
        this.EventEmiter.emit("mastervolumechange", val);
      }
    },
    CursorPosition: function (val) {
      if (val && this.Playlist) {
        this.EventEmiter.emit("setcursorposition", val);
      }
    },
    SelectionSegment: function (val) {
      if (val && this.Playlist) {
        this.EventEmiter.emit("select", val[0], val[1]);
      }
    }
  },
  mounted: function () {

    // FIXME: This was created by me.
    // ee.on('setcursorposition', function (start) {
    //     _this2.setTimeSelection(start, start);
    //     _this2.drawRequest();
    // });
    const theme = this.settings.theme();

    this.Playlist = this.WaveformPlaylist({
      samplesPerPixel: 3000,
      mono: true,
      waveHeight: 70,
      container: document.getElementById("playlist"),
      state: "cursor",
      colors: {
        waveOutlineColor: theme.secondary,
        timeColor: theme.accent,
        fadeColor: theme.font
      },
      seekStyle: "line",
      zoomLevels: [500, 1000, 3000, 5000]
    });

    window.Playlist = this.Playlist;

    this.Playlist.load([]).then(() => {
      this.Playlist.initExporter();
      this.EventEmiter = this.Playlist.getEventEmitter();
      this.CursorPositionMax = this.Playlist.duration;
      this.SelectionSegmentMax = this.Playlist.duration;

      this.EventEmiter.on("finished", () => {
        this.state = "pause";
      });

      this.EventEmiter.on("audiosourcesrendered", () => {
        this.CursorPositionMax = this.Playlist.duration;
        this.SelectionSegmentMax = this.Playlist.duration;
      });

      this.EventEmiter.on("finished", () => {
        this.CursorPositionMax = this.Playlist.duration;
        this.SelectionSegmentMax = this.Playlist.duration;
      });

      this.EventEmiter.on("shift", (time, track) => {
        this.trimmed[0] += time;
        this.trimmed[1] += time;

        this.CursorPositionMax = this.Playlist.duration;
        this.SelectionSegmentMax = this.Playlist.duration;
      });

      this.EventEmiter.emit("newtrack", this.file);

      this.EventEmiter.on("audiosourcesloaded", () => {
      });

      this.EventEmiter.on("audiosourcesrendered", () => {

        // We need to set the color manually for the audio viewer.
        /** @type {NodeListOf<HTMLElement>} */
        const canvases = this.document.querySelectorAll('.playlist .channel canvas');

        for (let i = 0; i < canvases.length; i++) {

          /** @type {HTMLElement} */
          const canvas = canvases[i];
          canvas.style.backgroundColor = this.settings.theme().accent;
        }

        this.Helper.forceColor();
      });

      this.EventEmiter.on("audiorenderingfinished", async (type, blob) => {

        let result;
        await new Promise(resolve => {
          let fileReader = new FileReader();

          fileReader.onload = dataUrl => {
            result = dataUrl.target.result;
            resolve();
          }

          fileReader.readAsDataURL(blob);
        });

        this.Helper.$emit("sound.prepare", result);
      });
    });
  },
  methods: {
    play: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit("play");
      this.state = "play";
    },
    pause: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit("pause");
      this.state = "pause";
    },
    stop: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit("stop");
      this.state = "pause";
    },
    save: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit("startaudiorendering", "wav");
    },
    trim: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit("trim");
      this.trimmed = this.SelectionSegment;
    },
    alignLeft: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit(
          "shift",
          this.trimmed[0] * -1,
          this.Playlist.activeTrack || this.Playlist.tracks[0]
      );
    },
    moveLeft: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit(
          "shift",
          this.stepSize * -1,
          this.Playlist.activeTrack || this.Playlist.tracks[0]
      );
    },
    moveRight: function () {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit(
          "shift",
          this.stepSize,
          this.Playlist.activeTrack || this.Playlist.tracks[0]
      );
    },
    statechange: function (state) {
      if (!this.Playlist) {
        return;
      }
      this.EventEmiter.emit("statechange", state);
      this.cursor = state;
      if (this.cursor === "select") {
        this.SelectionSegment = [0, this.CursorPosition];
      }
    },
    leave: function () {
      this.Helper.$emit("tile.editor");
    }
  }
};
</script>

<style lang="scss">
.tile-audio-editor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 50px;

  .audio-editor-item {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .audio-editor-item.extra {
    margin-top: 40px;
  }

  .cursor {
    background-color: black;
  }

  .selection.segment {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .selection.point {
    background-color: red;
  }

  > h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid;
    font-weight: initial;
    padding-bottom: 5px;
  }
}
</style>