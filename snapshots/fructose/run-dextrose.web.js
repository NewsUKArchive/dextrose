
 
  const dextrose = require("../../index").default;
  const path = require("path");
  
  const config = {
      snapPath: path.join(__dirname, '../snaps'),
      platformName: "web"
  }

dextrose(config);
