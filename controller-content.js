    //TAKLIMAT SHOLAT JUMAT
fetch("https://masarmuttaqi.github.io/masjid-info/src/json/taklimatsholatjumat.json")
    .then(response => response.json())
    .then(data => {
        console.log(data[0].arabic);
        console.log(data[0].indonesia);
        $('#taklimat-arabic').text(data[0].arabic);
        $('#taklimat-indonesia').html(data[0].indonesia);
    })
    .catch(err => console.error(err));
    // END OF TAKLIMAT SHOLAT JUMAT