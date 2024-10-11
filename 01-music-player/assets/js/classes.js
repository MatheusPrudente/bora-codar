class Music {
  constructor(name, band, thumbnail, url,currentTime, duration) {
    this.id = this.generateUniqueId(3);
    this.name = name;
    this.band = band;
    this.thumbnail = thumbnail;
    this.url = url;
    this.currentTime = currentTime;
    this.duration = duration;
  }

  generateUniqueId(parts) {
    const stringArr = [];

    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}

class Option {
  constructor(id, classNames, orientation, show) {
    this.id = id;
    this.classNames = classNames;
    this.orientation = orientation;
    this.show = show;
  }
}