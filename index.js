class Room {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {};
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("description is too short.");
            return;
        }
        this._description = value;
    }

    describe() {
        return (
            "Looking around the " + this._name + " you can see " + this._description
        );
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms)
        let details = []
        for (const [direction, room] of entries) {
            let text = `The ${room._name} is the ${direction}`
            details.push(text)
            return details
        }
    }

    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction]
        } else {
            alert("You can't go that way")
            return this
        }
    }

}

class Character {
    constructor(name) {
        (this._name = name), (this._description = "");
        this._conversation = "";
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return `You have met ${this._name}. ${this._description}`;
    }

    converse() {
        return `${this._name} says ${this._conversation}`;
    }
}

const Kitchen = new Room("kitchen");
Kitchen.description =
    "a long narrow room with worktops on either side and a large bench in the middle";
const Lounge = new Room("lounge");
Lounge.description = "a large room with two sofas and a large fire place";
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a large room with a pool table at it's centre";
const Hall = new Room("hall");
Hall.description =
    "a grand entrance hall with large paintings around the walls";

Kitchen.linkRoom("south", Lounge);
Kitchen.linkRoom("east", Hall);
Lounge.linkRoom("north", Kitchen);
Lounge.linkRoom("east", GamesRoom);
GamesRoom.linkRoom("west", Lounge);
GamesRoom.linkRoom("north", Hall);
Hall.linkRoom("south", GamesRoom);
Hall.linkRoom("west", Kitchen);

const displayRoomInfo = (room) => {
    let occupantMsg = "";
    if (room.Character) {
        //logic for displaying the character in thre room and their dialog
    } else {
        occupantMsg = "There is no one else in thie room."
    }

    const textContent = "<p>" + room.describe() + "</p>" +
        "<p>" + occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '<input type ="text" id = "usertext"/>';
    document.getElementById("usertext").focus()
}

const startGame = () => {
    currentRoom = Kitchen
    displayRoomInfo(currentRoom)

    document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            const command = document.getElementById("usertext").value
            const directions = ["north", "south", "east", "west"]

            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command)
                document.getElementById("usertext").value = ""
                displayRoomInfo(currentRoom)
            } else {
                alert("Not a valid command. Please try again")
                displayRoomInfo(currentRoom)
                document.getElementById("usertext").value = ""
            }
        }
    })
}

startGame()