import { Pipe, PipeTransform } from "@angular/core";

import _ from "lodash";

@Pipe({
    name: "filter"
})

/**
 * Returns like results from an array of objects
 */
export class FilterPipe implements PipeTransform {
    keyify(obj, prefix = "") {
        return Object.keys(obj).reduce((res, el) => {
            if (Array.isArray(obj[el])) {
                return res;
            } else if (typeof obj[el] === "object" && obj[el] !== null) {
                return [...res, ...this.keyify(obj[el], prefix + el + ".")];
            } else {
                return [...res, prefix + el];
            }
        }, []);
    }

    transform(value: Array<any>, searchTerm: string): any {
        return value.filter(root =>
            this.keyify(root)
                .map(path => _.get(root, path))
                .some(value =>
                    (value + "")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
        );
    }
}

