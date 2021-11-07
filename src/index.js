class Order {
    constructor() {
        this.order = [];
        this.isPaid = false;
    }

    addPosition(props, stuffing, weight) {
        if (props && stuffing) {
            this.order.push(new Hamburger(props, stuffing))
        } else if (props && weight) {
            this.order.push(new Salad(props, weight));
        } else {
            this.order.push(new Beverage(props));
        }
    }

    deletePosition(number) {
        if (!this.isPaid) {
            this.order = this.order.filter((item, index) => index !== number);
        } else {
            console.log("The order is paid. It is not possible to delete position!");
        }
    }

    pay() {
        this.isPaid = true;
        Object.freeze(this);
    }

    calculateOrderPrice() {
        return this.order.reduce((sum, cur) => sum + cur.calculatePrice(), 0);
    }

    calculateOrderCalories() {
        return this.order.reduce((sum, cur) => sum + cur.calculateCalories(), 0);
    }
}

class Position {
    constructor(props) {
        this.name = props.name;
        this.price = props.price;
        this.calories = props.calories;
    }

    getName() {
        return this.name;
    }

    calculatePrice() {
        return this.price;
    }

    calculateCalories() {
        return this.calories;
    }
}

class Beverage extends Position {
    static BEVERAGES = {
        cola: {name: "cola", price: 50, calories: 40},
        coffee: {name: "coffee", price: 80, calories: 20}
    };
}

class Salad extends Position {
    constructor(props, weight) {
        super(props);
        this.price = weight * props.price / Salad.WEIGHT;
        this.calories = weight * props.calories / Salad.WEIGHT;
    }

    static SALADS = {
        caesar: {name: "caesar", price: 100, calories: 20},
        olivier: {name: "olivier", price: 50, calories: 80}
    };
    static WEIGHT = 100;
}

class Hamburger extends Position {
    constructor(props, stuffing) {
        super(props);
        this.price = props.price + stuffing.price;
        this.calories = props.calories + stuffing.calories;
        this.size = props.size;
        this.stuffing = stuffing.name;
    }

    static HAMBURGERS = {
        small: {name: "hamburger", size: "small", price: 50, calories: 20},
        big: {name: "hamburger", size: "big", price: 100, calories: 40},
    };
    static HAMBURGER_STUFFINGS = {
        cheese: {name: "cheese", price: 10, calories: 20},
        salad: {name: "salad", price: 20, calories: 5},
        potato: {name: "potato", price: 15, calories: 10}
    };

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }
}

let newOrder = new Order();
newOrder.addPosition(Hamburger.HAMBURGERS.big, Hamburger.HAMBURGER_STUFFINGS.cheese);
newOrder.addPosition(Hamburger.HAMBURGERS.small, Hamburger.HAMBURGER_STUFFINGS.salad);
newOrder.addPosition(Salad.SALADS.caesar, false, 300);
newOrder.addPosition(Salad.SALADS.olivier, false, 200);
newOrder.addPosition(Beverage.BEVERAGES.coffee);
newOrder.deletePosition(3);
newOrder.pay();
newOrder.deletePosition(2);

console.log("Order: ", newOrder.order);
console.log("Order price: ", newOrder.calculateOrderPrice());
console.log("Order calories: ", newOrder.calculateOrderCalories());