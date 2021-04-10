const appModule = (() => {

    let init = () => {
        initializeFlipDown();
        registerMakeItAHolidayEvent();
        $('#curved-heading').arctext({ radius: 300 });
    }

    let initializeFlipDown = () => {
        let eventDate = new Date('2022.04.09').getTime() / 1000
        new FlipDown(eventDate, "event-countdown").start();
    }


    let registerMakeItAHolidayEvent = () => {

    }

    return {
        init: init
    }

})();


appModule.init();