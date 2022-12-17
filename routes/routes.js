const passport = require("passport");
const express = require("express");
const mealDB = require("../API/mealDB");
const calorieNinjas = require("../API/calorieNinjas");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("../view/index.ejs");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("../view/profile.ejs", {
    user: req.user,
  });
});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// MealDB ---
router.get("/meal/categories", async () => {
  await mealDB.getCategories().then((response) => {
    if (response.success) {
      res.render("../view/categories.ejs", {
        categories: response.data,
      });
    } else {
      res.render("../view/nothing.ejs");
    }
  });
});

router.get("/meal/random", async () => {
  await mealDB.getRandomMeal().then((response) => {
    if (response.success) {
      res.render("../view/meal.ejs", {
        meal: response.data,
      });
    } else {
      res.render("../view/nothing.ejs");
    }
  });
});

router.get("/meal/search", async (req, res) => {
  if (req.query.q === undefined || req.query.q === null)
    res.render("../view/nothing.ejs");
  await mealDB.search(req.query.q, mealDB.SEARCH_BY_TEXT).then((response) => {
    if (response.success) {
      res.render("../view/search.ejs", {
        meal: response.data,
      });
    } else {
      res.render("../view/nothing.ejs");
    }
  });
});

router.get("/meal/nutrition", async (req, res) => {
  if (req.query.q === undefined || req.query.q === null)
    res.render("../view/nothing.ejs");
  await calorieNinjas.getNutritions(req.query.q).then((response) => {
    console.log(response);
    // if (response.success) {
    //   res.render("../view/meal.ejs", {
    //     meal: response.data,
    //   });
    // } else {
    //   res.render("../view/nothing.ejs");
    // }
  });
});

// Auth ---

/**
 * Facebook auth
 */
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

/**
 * Google auth
 */
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

/**
 * Check if logged
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns next|redirect
 */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
