import Person from './p/person';

class Friend extends Person{
    constructor(name) {
      super(name);
    }
    callName() {
      console.log(this.name);
      console.log(lufylegend);
    }
}

var friend = new Friend('Ryo');

friend.callName();