class Computer {
    constructor({ id, marca, cpu, dim_ram, status, note }) {
        this._marca = marca
        this._note = note;
        this._id = id;
        this._cpu = cpu;
        this._dim_ram = dim_ram;
        this._status = status;
    }

    get note() {
        return this._note;
    }

    get id() {
        return this._id;
    }

    get cpu() {
        return this._cpu;
    }

    get dim_ram() {
        return this._dim_ram;
    }

    get status() {
        return this._status;
    }

}