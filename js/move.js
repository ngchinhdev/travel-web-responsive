const findYourState = () => {

    const result = document.querySelector('.find-loc .result');


    const success = (position) => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode
        // -client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        // fetch(geoApiUrl)
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        // })

        const linkMap = `<a href='https://www.openstreetmap.org/#map=5/${latitude}/${longitude}'>
            Vị trí hiện tại của bạn: vĩ độ: ${latitude}, kinh độ: ${longitude}
        </a>`;

        result.innerHTML = linkMap;
    }

    const error = () => {
        result.textContent = 'Không thể truy cập vào vị trí của bạn!'
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

document.querySelector('.find-loc button').addEventListener('click', findYourState)