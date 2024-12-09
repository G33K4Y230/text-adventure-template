const computer = {
    name: "Macbook Pro",
    year: 2019,
    color: "Space Gray",
    describe: function() {
        console.log(`The ${this.name} was released in ${this.year}`)
    }
}

computer.describe()

class Animal {
    constructor(name, noOfLegs) {
        this._name = name;
        this._noOfLegs = noOfLegs;
    }

    get name() { return this._name }

    set name(newName) { 
        if(newName.length > 3) { 
            console.log("Name is too short")
            return
        }

        this._name = newName 
    }

    describe = () => {
        return `${this.name} has ${this._noOfLegs} legs`
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 4)
        this._breed = breed;
    }

    describe = () => {
        return `${this._name} is a ${this._breed}`
    }
}

const Clifford = new Dog("Clifford", "Big Red Dog")
console.log(Clifford.describe())

// const Dog = new Animal("Clifford", 4)
// console.log(Dog.name)
// Dog.name = "Scooby doo"
// console.log(Dog.name)

class Room {
    
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = { } 
    }

    get name() { return this._name }
    get description() { return this._description }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink
    }

}

const kitchen = new Room("Kitchen", "A clean and sparkling place")
const livingRoom = new Room("Living Room", "A cosy place to relax")

kitchen.linkRoom("north", livingRoom)
console.log(kitchen._linkedRooms)
livingRoom.linkRoom("south", kitchen)
console.log(livingRoom._linkedRooms)

// kitchen
// living room
// kitchen is south of the living room
// living room is north of the kitchen 