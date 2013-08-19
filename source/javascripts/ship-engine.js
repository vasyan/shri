/**
 * Функция для работы с бортовым журналом
 * @param type
 * @param msg
 */
function r2d2_logger(type, msg) {
    $(".ships-console__log").append($("<li class='" + type + "'>" + msg + "</li>"));
    log_wrp = $(".ship-console");
    log_wrp.animate({
        scrollTop: log_wrp.prop("scrollHeight") - log_wrp.height() }, 50);
}

/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name;
    this.position = position;
    this.capacity = capacity;
    this.cargo = 0;
    r2d2_logger("falcon", falcon());
    r2d2_logger("message", "Создан корабль «" + this.name + "».");
}
/**
 * Возвращает true если корабль находится на планете
 * @returns {boolean}
 */

Vessel.prototype.isLanded = function () {
    return this.position instanceof Planet;
}

/**
 * Возвращает местоположение корабля.
 * @returns {*}
 */
Vessel.prototype.getPosition = function() {
    return (this.position instanceof Planet) ? this.position.name : this.position;
}
/**
 * Выводит текущее состояние корабля: имя, местоположение, загруженность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    var position;
    if(this.isLanded()) {
        position = "Планета «" + this.position.name + "»";
    } else{
        position = this.position;
    }
    return ("---------------------- <br/>Корабль «" + this.name + "». <br/>" +
        "Местоположение: " + position + ". <br/>" +
        "Свободного места в трюме: " + this.cargo + " из " + this.capacity + "т.<br/> ----------------------");
};

/*
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    return (this.capacity - this.cargo);
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    return this.cargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    this.position = newPosition;
    r2d2_logger("message", "Капитан, взят курс на планету " + this.getPosition() + "!");
    r2d2_logger("message", ".....")
    r2d2_logger("message", "Прилетели!")
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.name = name;
    this.position = position;
    this.availableAmountOfCargo = availableAmountOfCargo;
    r2d2_logger("message", "Планета «" + this.name + "» создана.");
}

/**
 * Проверяет наличие груза.
 * @param amount
 * @returns {boolean}
 */

Planet.prototype.haveCargo = function(amount) {
    return this.availableAmountOfCargo >= amount;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    return ( "----------------------<br/>Планета «" + this.name + "». <br/>" +
        "Местоположение: " + this.position + ". <br/>" +
        "Доступно груза: " + this.getAvailableAmountOfCargo()) + "<br/> ----------------------";
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return (this.availableAmountOfCargo === 0) ? "На складах пусто." : this.availableAmountOfCargo + "т."
}

/**
 * Загружает на корабль заданное количество груза.
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if (vessel.isLanded()) {
        if (this.haveCargo(cargoWeight)) {
            if (vessel.cargo + cargoWeight <= vessel.capacity) {
                r2d2_logger("message", "Капитан, на корабль «" + vessel.name + "»"
                    + " погружено "+ cargoWeight + "единиц груза!");
                this.availableAmountOfCargo -= cargoWeight;
                vessel.cargo += cargoWeight;
            } else {
                r2d2_logger("error", "Капитан, трюм «" + vessel.name + "» переполнен!.");
            }
        } else {
            r2d2_logger("error", "Капитан, склад на планете " + this.name + " пуст!")
        }
    } else {
        r2d2_logger("error", 'Капитан, мы в открытом космосе! Сначала нужно кинуть гравитационный якорь!')
    }
}

/**
 * Выгружает с корабля заданное количество груза.
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if (vessel.isLanded()) {
        if (vessel.getOccupiedSpace() >= cargoWeight) {
            r2d2_logger("message", "Капитан, " + cargoWeight + " выгружено на планету " + this.name);
            this.availableAmountOfCargo += cargoWeight;
            vessel.cargo -= cargoWeight;
        } else {
            r2d2_logger("error", "Капитан, на корабле «"+ vessel.name + "» недостаточно груза.")
        }
    } else {
        r2d2_logger("error", 'Капитан, мы в открытом космосе! Сначала нужно кинуть гравитационный якорь!')
    }
}

/**
 * Инициализация вселенной.
 */

function bigBang() {
    var vessel = new Vessel('Яндекс', [0,0], 1000);
    var planetA = new Planet('А', [66, 88], 1000);
    var planetB = new Planet('Б', [102, 754], 1000);

    $(".goto-planetA").on("click", function() {
        vessel.flyTo(planetA);
    });
    $(".goto-planetB").on("click", function() {
        vessel.flyTo(planetB);
    });
    $(".download-to-ship").on("click", function() {
        if (vessel.isLanded()) {
            vessel.position.loadCargoTo(vessel, 500);
        } else{
            r2d2_logger("error", "Перед загрузкой груза приземлитесь на планету");
        }
    });
    $(".unload-from-ship").on("click", function() {
        if (vessel.isLanded()) {
            vessel.position.unloadCargoFrom(vessel, 500)
        } else{
            r2d2_logger("error", "Перед выгрузкой груза приземлитесь на планету");
        }
    });
    $(".ship-status").on("click", function() {
        r2d2_logger("report", vessel.report());
    });
    $(".scanner").on("click", function() {
        r2d2_logger("report", planetA.report());
        r2d2_logger("report", planetB.report());
    });
}

/**
 * Начало всех начал.
 */

$(function() {
    bigBang();
});

function falcon() {
    return "<pre>" + $('#falcon').text() + "</pre>";
}