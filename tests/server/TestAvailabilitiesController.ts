import request from 'supertest';
import { AppConstants } from "../../src/Utils/AppConstants.js";
import {ServerBuilder} from "../../src/ServerBuilder.js";
import { DateUtils } from "../../src/Utils/DateUtils.js";

let server = ServerBuilder.build()
ServerBuilder.start(server)

describe(`GET ${AppConstants.Server.Routes.getAllSummarizedAvailabilities}`, () => {
    it('All summarized bookings', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.getAllSummarizedAvailabilities)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.getAllAvailabilities}`, () => {
    it('All bookings', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.getAllAvailabilities)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.getSummarizedAvailabilitiesBetweenDates}`, () => {
    it('Summarized bookings between a range of dates', (done) => {
        let currentDate = DateUtils.getCurrentDayDate()
        let body = {
            "startDate": DateUtils.getDateString(currentDate),
            "endDate": DateUtils.getDateString(DateUtils.addDaysToDate(currentDate, 40))
        }
        request(server)
            .get(AppConstants.Server.Routes.getSummarizedAvailabilitiesBetweenDates)
            .send(body)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.getAvailabilitiesBetweenDates}`, () => {
    it('Bookings by number of guests', (done) => {
        let currentDate = DateUtils.getCurrentDayDate()
        let body = {
            "startDate": DateUtils.getDateString(currentDate),
            "endDate": DateUtils.getDateString(DateUtils.addDaysToDate(currentDate, 40))
        }
        request(server)
            .get(AppConstants.Server.Routes.getAvailabilitiesBetweenDates)
            .send(body)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.getSummarizedAvailabilitiesByNumberOfGuests}`, () => {
    it('Summarized bookings by number of guests', (done) => {
        let body = {"numberOfGuests": [2]}
        request(server)
            .get(AppConstants.Server.Routes.getSummarizedAvailabilitiesByNumberOfGuests)
            .send(body)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.getAvailabilitiesByNumberOfGuests}`, () => {
    it('Bookings by number of guests', (done) => {
        let body = {"numberOfGuests": [2]}
        request(server)
            .get(AppConstants.Server.Routes.getAvailabilitiesByNumberOfGuests)
            .send(body)
            .expect(200)
            .end(done)
    }).timeout(0)
});


server.close()
