// Copyright IBM Corp. 2015,2017. All Rights Reserved.
// Node module: loopback-example-relations
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  const router = app.loopback.Router();
  router.get('/getQRCode/:email', async (req, res, next) => {
    const email = req.params.username
    const data = await app.models.qr_code.getPublicPathByEmail(email)
    res.render('index', {img: data});
  })

  app.use(router);
};
