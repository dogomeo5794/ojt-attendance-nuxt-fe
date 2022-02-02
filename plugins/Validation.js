import Vue from "vue";
import moment from "moment";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import {
  required,
  email,
  max,
  min,
  alpha,
  numeric,
  regex,
  min_value,
  confirmed,
} from "vee-validate/dist/rules";

// No message specified.
extend("email", {
  ...email,
  message: "Email format is invalid",
});

// Override the default message.
extend("required", {
  ...required,
  message: "This field is required",
});

extend("max", {
  ...max,
  message: "This field must not be more than {length} characters",
});

extend("min", {
  ...min,
  message: "This field must be at least {length} characters",
});

extend("numeric", {
  ...numeric,
  message: "This field only accept numeric value",
});

extend("alpha", {
  ...alpha,
  message: "This field only accept alphabetic characters",
});

extend("regex", {
  ...regex,
  message: "Please check your format.",
});

extend("min_value", {
  ...min_value,
  message: "value must not less than {min}",
});

extend("fromToErr", {
  params: ["str"],
  validate(value, { str }) {
    return /[a-z]/.test(value);
  },
  message: "Year from must not be ahead of Year to",
});

extend("startEndErr", {
  params: ["str"],
  validate(value, { str }) {
    return /[a-z]/.test(value);
  },
  message: "Start Training must not be ahead of End Training",
});

extend("confirmed", {
  ...confirmed,
  message: "Password not match.",
});

extend("max_date", {
  validate: (value, { min }) => {
    let max = moment(new Date(value)).format("YYYY-MM-DD");
    let now = moment().format("YYYY-MM-DD");
    let invalidYear = moment(new Date(value)).format("YYYY");
    return now >= max && Number(invalidYear) > 1950;
  },
  params: ["min"],
  message: "Invalid Date",
});

extend("min_date", {
  validate: (value, { max }) => {
    let min = moment(new Date(value)).format("YYYY-MM-DD");
    let now = moment().format("YYYY-MM-DD");
    let invalidYear = moment(new Date(value)).format("YYYY");
    return now <= min && Number(invalidYear) > 1950;
  },
  params: ["max"],
  message: "Invalid Date",
});

extend("hasLowerCase", {
  params: ["str"],
  validate(value, { str }) {
    return /[a-z]/.test(value);
  },
  message: "Must contain lowercase",
});

extend("hasUpperCase", {
  params: ["str"],
  validate(value, { str }) {
    return /[A-Z]/.test(value);
  },
  message: "Must contain uppercase",
});

extend("hasSpecialChar", {
  params: ["str"],
  validate(value, { str }) {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
  },
  message: "Must contain special char",
});

extend("hasNumber", {
  params: ["str"],
  validate(value, { str }) {
    return /[0-9]/.test(value);
  },
  message: "Must contain number",
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
