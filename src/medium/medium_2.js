import { sumToString } from "../mild/mild_1.js";
import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {city: getStatistics(mpg_data.map(function(car){return car.city_mpg})).mean, highway: getStatistics(mpg_data.map(function(car){return car.highway_mpg})).mean},
    allYearStats: getStatistics(mpg_data.map(function(car){return car.year})),
    ratioHybrids: mpg_data.map(function(car){ if (car.hybrid == true){return 1} return 0}).reduce((accumulator, curr) => accumulator + curr) / mpg_data.length
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function hybridBrandList(car_data){
    var brands = [];
    for(let i = 0; i < car_data.length; i++){
        if((car_data[i].hybrid == 1) && !(brands.includes(car_data[i].make))){
            brands.push(car_data[i].make)
        }
    }
    return brands
}

export function hybridModelList(car_data, make){
    var hybrids = [] // create a new array
    // if you are truly seeking forgiveness, you are going to improve
    for(let i = 0; i < car_data.length; i++){
        if((make == car_data[i].make) && (car_data[i].hybrid == true)){
            hybrids.push(car_data[i].id)
        } // bascially makes a list for the given make of all the hybrids
    }
    return hybrids
}

function generate_moreStats(car_data){
    var year_arr = []
    for( let i =0; i<car_data.length; i++){
        if(!year_arr.includes(car_data[i].year)){
            year_arr.push(car_data[i].year)
        }
    }

    var morestat = {}

    for(let i = 0; i< year_arr.length; i++){ // for each year in car_data
        let hybrids_city= []
        let hybrids_highway= []
        let non_hybrids_city =[]
        let non_hybrids_highway =[]
        for(let j = 0; i< car_data.length; j++){
            if(year_arr[i]==car_data[j].year){
                if(car_data[j].hybrid){
                    hybrids_city.push(car_data[j].city_mpg)
                    hybrids_highway.push(car_data[j].highway_mpg)
                } else{
                    non_hybrids_city.push(car_data[j].city_mpg)
                    non_hybrids_highway.push(car_data[j].highway_mpg)
                }
                morestat[year_arr[i]] = {hybrid:{city: hybrids_city.getStatistics.mean, highway: hybrids_highway.getStatistics.mean}, 
                notHybrid: {city: non_hybrids_city.getStatistics.mean, highway: non_hybrids_highway.getStatistics.mean}}
                // add to morestat the correct dictionary item
            } 
        }
        
    }
    return morestat
}

export const moreStats = {
    // makerHybrids: hybridBrandList(mpg_data).map(function(brand){return {make: brand, hybrids: hybridModelList(mpg_data, brand)}}), // something wrong with this line
    // maps onto each hybrid brand the list of hybrid models
    // something is wrong with the way i am mapping
    avgMpgByYearAndHybrid: generate_moreStats(mpg_data) // wait to move forward till you've figured out issue here
    // for each year, generate avg mpg of hybrid and none hybrid (use get stat function on an array of mpg for hybrids/ non hybrids
};
