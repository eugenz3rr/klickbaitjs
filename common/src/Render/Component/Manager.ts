import Console from "../../Console";
import Component from "./Component";

export default class ComponentManager extends Console {

    public regions: Component[] = [];
    public containers: Component[] = [];
    public elements: Component[] = [];

    constructor(fileSystem: any) {
        super(fileSystem);
    }

    public getAll(): Component[] {
        return [...this.regions, ...this.containers, ...this.elements];
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
    public getComponentById(id: string, components: Component[] = this.getAll()): Component | undefined {
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
    public getComponentsByType(type: string = 'all', components: Component[] = this.getAll()): Component[] {
        return components.filter(component => (component.type === type || type === 'all'));
    }

    public getVueComponentByType(type: string = 'all', components: Component[] = this.getAll()): any[] {
        let results: any[] = components.filter( component => (component.type === type || type === 'all'));
        results = results.map( component => component.getComponent());
        return results;
    }
}