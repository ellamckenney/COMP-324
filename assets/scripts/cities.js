var text = '{"neighborhoods" : ['
    '{ "neighborhood": "Mitte", "city": "Berlin", "state": "Berlin", "country": "Germany" },'
    '{ "neighborhood": "Wedding", "city": "Berlin", "state": "Berlin", "country": "Germany" },'
    '{ "neighborhood": "Edgewater", "city": "Chicago", "state": "Illinois", "country": "United States" },'
    '{ "neighborhood": "Rogers Park", "city": "Chicago", "state": "Illinois", "country": "United States" } ]}';

var obj = JSON.parse(text);

console.log(obj);
document.write(obj.neigborhoods[0].name);

var obj = JSON.stringify(neigborhoods);
console.log(obj)