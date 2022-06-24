module.exports = (title,text,icon,route) => {
    const alertConfig = {
        alert:true,
        title,
        text,
        icon,
        showConfirmButton:true,
        timer:false,
        route
    }
    console.log(alertConfig);
    return alertConfig;
}