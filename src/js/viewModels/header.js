/*
** Oracle Mobile Chat version 1.0.
**
** Copyright © 2019 Oracle Corp.  All rights reserved.
** Licensed under the Universal Permissive License v 1.0 as shown at http://oss.oracle.com/licenses/upl.
*/
// header module viewModel

'use strict';
define(['ojs/ojbutton'], function () {
  function headerVM(params) {
    var self = this;
    self.transitionCompleted = params.transitionCompleted;
    self.toggleDrawer = params.toggleDrawer;
    self.pageTitle = params.pageTitle || '';
    self.startBtn = params.startBtn;
    // self.endBtn = params.endBtn;
    // self.endBtn.disabled = params.endBtn.disabled || false;
  }
  return headerVM;
});
