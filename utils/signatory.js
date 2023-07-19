var middlewareObj = {};

function sort_json(json)
{
    var  ordered = Object.keys(json).sort().reduce(
        (obj, key) => {
            obj[key] = json[key];
            return obj;
        },
        {}
    );

    return ordered;
}

function normalize(json) {
  
    var str = '';

    var  ordered =sort_json(json);

    const props = Object.keys(ordered);
    for (var x = 0; x < props.length; x++)
    {
       if(ordered[props[x]].length)
       {
        for (var y = 0; y < ordered[props[x]].length; y++)
        {
            ordered[props[x]][y]=sort_json(ordered[props[x]][y]);
        }
       }
       else
       {
        ordered[props[x]]=sort_json(ordered[props[x]]);
       }
    }

    return str;
}

middlewareObj.signatory = function (json) {
    return normalize(json);
};

module.exports = middlewareObj;