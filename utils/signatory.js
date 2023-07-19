var middlewareObj = {};

function sort_json(json) {
    var ordered = Object.keys(json).sort().reduce(
        (obj, key) => {
            obj[key] = json[key];
            return obj;
        },
        {}
    );

    return ordered;
}

function normalize(json) {

    var normalize_str = '';

    var ordered = sort_json(json);

    const props = Object.keys(ordered);
    var sep = '';

    for (var x = 0; x < props.length; x++) {
        if (ordered[props[x]].length) {
            for (var y = 0; y < ordered[props[x]].length; y++) {
                ordered[props[x]][y] = sort_json(ordered[props[x]][y]);

                var sub_props = Object.keys(ordered[props[x]][y]);
                for (var i = 0; i < sub_props.length; i++) {

                    var val='#';
                    if(ordered[props[x]][y][sub_props[i]])
                    {
                        val =ordered[props[x]][y][sub_props[i]];
                    }

                    normalize_str = normalize_str + sep + val;
                    sep = '#';
                }
            }
        }
        else {
            ordered[props[x]] = sort_json(ordered[props[x]]);
            var sub_props = Object.keys(ordered[props[x]]);
            for (var i = 0; i < sub_props.length; i++) {

                var val='#';
                if(ordered[props[x]][sub_props[i]])
                {
                    val =ordered[props[x]][sub_props[i]];
                }
               
                normalize_str = normalize_str + sep + val;
                sep = '#';
            }
        }
    }

    return normalize_str;
}

middlewareObj.signatory = function (json) {
    return normalize(json);
};

module.exports = middlewareObj;