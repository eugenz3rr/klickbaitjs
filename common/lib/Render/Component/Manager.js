import Console from "../../Console";
export default class ComponentManager extends Console {
    constructor(fileSystem) {
        super(fileSystem);
        this.regions = [];
        this.containers = [];
        this.elements = [];
    }
    getAll(exclude = []) {
        let components = [...this.regions, ...this.containers, ...this.elements];
        components = components.filter(component => !exclude.includes(component.id));
        return components;
    }
    /**
     * A function to fetch a component by id.
     *
     * @param id {String}
     *   Expects an id to search for.
     * @param components {Component}
     *   Optional: A collection of components to search in, instead of the array provided by "getAll".
     *
     * @return
     *   Returns an Component or undefined when not found.
     */
    getComponentById(id, components = this.getAll()) {
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            if (component.id === id) {
                return component;
            }
        }
        return undefined;
    }
    /**
     * A function to fetch a collection of components by type.
     *
     * @param type {String}
     *   Expects a type to search for.
     * @param components {Component}
     *   Optional: A collection of components to search in, instead of the array provided by "getAll".
     *
     * @return
     *   Returns a collection of Components.
     */
    getComponentsByType(type = 'all', components = this.getAll()) {
        return components.filter(component => (component.type === type || type === 'all'));
    }
    getVueComponentByType(type = 'all', components = this.getAll()) {
        let results = components.filter(component => (component.type === type || type === 'all'));
        results = results.map(component => component.getComponent());
        return results;
    }
}
