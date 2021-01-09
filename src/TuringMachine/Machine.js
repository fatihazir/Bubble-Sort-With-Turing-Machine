import "./Head"

class Machine {
    constructor(ruleset, tape, head) {
        this.ruleset = ruleset;
        this.tape = tape;
        this.head = head
    }

    get status() {
        return this.tape.status
    }

    stepLookup() {
        const ruleset = this.ruleset.find(x=> x.currentState === this.head.state
            && x.currentValue === this.tape.tape[this.head.location]);

        return ruleset ? ruleset : false

         /*
        if (this.ruleset[this.head.state] && this.ruleset[this.head.state][this.tape.tape[this.head.location]]) {
            return this.ruleset[this.head.state][this.tape.tape[this.head.location]]
        } else {
            return false
        }
          */
    }

    step() {
        const lookup = this.stepLookup();
        let new_state = lookup[0];
        let new_symbol = lookup[1];
        let move = lookup[2];

        this.tape.write(new_symbol, this.head.location);
        this.head.state = new_state
        this.shiftHead(move)
    }

    shiftHead(move) {
        if (this.head.location == 0 && move == "L") {
            this.tape.extendLeft()
        } else if (this.head.location == this.tape.tape.length - 1 && move == "R") {
            this.tape.extendRight()
            this.head.location += 1
        } else if (move == "L") {
            this.head.location -= 1
        }
        else if (move == "S"){

        }
        else {
            this.head.location += 1
        }
    }

    run(currentTape) {
        while ( this.stepLookup() ) {
            console.log(this.tape.status)
            this.step();
            currentTape(this.tape.status, this.head.location)
        }
    }
}

export default Machine