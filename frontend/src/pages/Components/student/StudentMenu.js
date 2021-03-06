import React, { useState, useEffect } from 'react'
import { isAuthenticated, getMenu } from "../../../util/studentApi";
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import FilterDramaOutlinedIcon from '@material-ui/icons/FilterDramaOutlined';


function StudentMenu() {
    const token=isAuthenticated()&&isAuthenticated().studenttoken;
    const [menu, setMenu] = useState({})
    useEffect(async () => {
        try {
            let menuRes = await getMenu(token)
            // console.log(typeof("ff"))
            setMenu(menuRes)
        } catch (err) {console.log(err)}
    }, [token])
  return (
        <div>
            <h3 className="student-card-heading">Today's menu</h3>
            <div className="menu__grid">
                <div className="menu__grid__card">
                    <div className="menu__mealname">Breakfast <FilterDramaOutlinedIcon className="icon" /> </div>
                    <div className="menu__card menu__fooditem">
                        <span>Main course</span>
                        { menu?.Meal?.breakfast.foodItem.length? menu.Meal.breakfast.foodItem : "N/A" }
                    </div>
                    <div className="menu__card menu__dessert">
                        <span>Dessert</span>
                        { menu?.Meal?.breakfast.desert.length? menu.Meal.breakfast.desert : "N/A" }
                    </div>
                </div>
                <div className="menu__grid__card">
                    <div className="menu__mealname">Lunch <WbSunnyOutlinedIcon className="icon" /> </div>
                    <div className="menu__card menu__fooditem">
                        <span>Main course</span>
                        { menu?.Meal?.lunch.foodItem.length? menu.Meal.lunch.foodItem : "N/A" }
                    </div>
                    <div className="menu__card menu__dessert">
                        <span>Dessert</span>
                        { menu?.Meal?.lunch.desert.length? menu.Meal.lunch.desert : "N/A" }
                    </div>
                </div>
                <div className="menu__grid__card">
                    <div className="menu__mealname">Dinner <NightsStayOutlinedIcon className="icon icon--moon" /> </div>
                    <div className="menu__card menu__fooditem">
                        <span>Main course</span>
                        { menu?.Meal?.dinner.foodItem.length? menu.Meal.dinner.foodItem :  "N/A" }
                    </div>
                    <div className="menu__card menu__dessert">
                        <span>Dessert</span>
                        { menu?.Meal?.dinner.desert.length? menu.Meal.dinner.desert : "N/A" }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentMenu
