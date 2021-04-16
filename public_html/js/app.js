const appModule = (function () {

    let init = function () {
        initFlipDown();
        initDatePickers();
        initRSVPClickAction();
        initClearValiationTexts();
        showHideDateSection();
        initOpenNavEvent();
        initCloseNavEvent();
        initNavLinkClickAction();
        initCloseAlertEvent();
        $('#curved-heading').arctext({ radius: 300 });
    }

    let initFlipDown = function () {
        let eventDate = new Date('2022-04-09').getTime() / 1000;
        new FlipDown(eventDate, "event-countdown").start();
    }

    let initDatePickers = function () {
        MCDatepicker.create({
            el: '#start-date-picker',
            minDate: new Date(2022, 02, 27),
            disableDates: getDisabledDates()
        });

        MCDatepicker.create({
            el: '#end-date-picker',
            minDate: new Date(2022, 02, 27),
            disableDates: getDisabledDates()
        });
    }

    let initNavLinkClickAction = function () {
        $('.nav-link').click(function () {
            $('#navigation').css("width", "0%");
            $('.nav-icon-container').show();
        })
    }
    let initOpenNavEvent = function () {
        $('.nav-icon').click(function () {
            $('.nav-icon-container').hide();
            $('#navigation').css("width", "100%");
        })
    }

    let initCloseNavEvent = function () {
        $('.close-btn').click(function () {
            $('#navigation').css("width", "0%");
            $('.nav-icon-container').show();
        })
    }

    let initCloseAlertEvent = function () {
        $('.rsvp-alert-close').click(function () {
            $('#rsvp-alert').hide();
            $(".rsvp-alert-close").hide();
        })
    }
    let getDisabledDates = function () {
        let disabledDates = [
            new Date(2022, 03, 01),
            new Date(2022, 03, 02),
            new Date(2022, 03, 03),
            new Date(2022, 03, 04),
            new Date(2022, 03, 05),
            new Date(2022, 03, 06),
            new Date(2022, 03, 07),
            new Date(2022, 03, 08),
            new Date(2022, 03, 09)
        ]
        return disabledDates;
    }

    let initRSVPClickAction = () => {
        $('.btn-submit-rsvp').click(function () {
            let data = getInputFields();
            let allValid = validateFields(data);
            if (allValid) {
                postData(data);
            }
        })
    }

    let showHideDateSection = function () {
        $("#holiday").change(function () {
            if ($(this).prop("checked") === true) {
                $(".holiday-dates-section").css("display", "flex");
            } else {
                $(".holiday-dates-section").hide();
            }
        })
    }

    let getInputFields = function () {
        let startDate = $("#start-date-picker").val();
        let endDate = $("#end-date-picker").val();
        let email = $('#email').val();
        let firstname = $('#first-name').val();
        let lastname = $('#last-name').val();
        let additionalGuests = $('#additional-guests').val();
        let event = $('#events-select').val();
        let holiday = $('#holiday').prop('checked');

        let data = { email, firstname, lastname, additionalGuests, event, holiday }

        if (holiday) {
            data["startDate"] = startDate;
            data["endDate"] = endDate;
        }

        return data;
    }

    let validateFields = function (fields) {
        let allValid = true;

        if (fields.email.trim() === "") {
            $('#email-validation-text').html("Tell us your email address.");
            $('#email-validation-text').show();
            allValid = false;
        }

        if (fields.firstname.trim() === "") {
            $('#firstname-validation-text').html("Tell us your first name.");
            $('#firstname-validation-text').css("display", "block");
            allValid = false;
        }

        if (fields.lastname.trim() === "") {
            $('#lastname-validation-text').html("Tell us your last name.");
            $('#lastname-validation-text').show();
            allValid = false;
        }

        if (fields.event == null || fields.event.trim() == "") {
            $('#events-validation-text').html("Tell us what events you will be attending.");
            $('#events-validation-text').show();
            allValid = false;
        }

        if (fields.holiday) {

            if (fields.startDate == undefined || fields.startDate.trim() === "") {
                $('#startdate-validation-text').html("Select a start date.");
                $('#startdate-validation-text').show();
                allValid = false;
            }

            if (fields.endDate == undefined || fields.endDate.trim() === "") {
                $('#enddate-validation-text').html("Select a end date.");
                $('#enddate-validation-text').show();
                allValid = false;
            }
        }

        return allValid;
    }


    let initClearValiationTexts = function () {
        $("input").on('keyup', function () {
            $('.rsvp-validation-text').hide();
        })
    }

    let postData = function (data) {
        $.ajax({
            type: "POST",
            url: "/api/v1/rsvp",
            dataType: "json",
            data: data,
            success: function (response) {
                if (response.status == "success") {
                    $('#rsvp-alert').removeClass("alert-danger");
                    $('#rsvp-alert').addClass("alert-success");
                    $('.result-text').html(response.message);
                } else {
                    $('#rsvp-alert').removeClass("alert-success");
                    $('#rsvp-alert').addClass("alert-danger");
                    $('.result-text').html(response.message);
                }
                $("#rsvp-alert").show();
                clearAllFields();
            },
            error: function (response) {
                $('#rsvp-alert').addClass("alert-danger");
                $('.result-text').html("Could not send your RSVP request. Please try again in a few minutes.");
                $("#rsvp-alert").show();
                $(".rsvp-alert-close").show();
            }
        });
    }


    let clearAllFields = function () {
        $("#start-date-picker").val("");
        $("#end-date-picker").val("");
        $('#email').val("");
        $('#first-name').val("");
        $('#last-name').val("");
        $('#additional-guests').val("");
        $('#events-select').val("");
        $('#holiday').prop('checked', false);
    }

    return {
        init: init
    }

})();


appModule.init();