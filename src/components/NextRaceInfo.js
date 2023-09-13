class NextRaceInfo extends HTMLElement {
    constructor(){
        super();
        const component = this;
        this.time = new Date(this.dataset.time);
        this.remainingMs = this.time - new Date();
        var timerID = setInterval(()=>this.updateTime(component), 1000);
    }

    updateTime(nextRaceInfo) {
        nextRaceInfo.remainingMs -= 1000; 
        document.getElementById('time').innerText = dhm(nextRaceInfo.remainingMs);
    };
}

    function zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    function dhm (ms) {
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms = ms % (24*60*60*1000);
        const hours = Math.floor(daysms / (60*60*1000));
        const hoursms = ms % (60*60*1000);
        const minutes = Math.floor(hoursms / (60*1000));
        const minutesms = ms % (60*1000);
        const sec = Math.floor(minutesms / 1000);
        return zeroPadding(days) + " days " + zeroPadding(hours, 2) + ":" + zeroPadding(minutes, 2) + ":" + zeroPadding(sec, 2);
    }

    customElements.define('next-race-info', NextRaceInfo);