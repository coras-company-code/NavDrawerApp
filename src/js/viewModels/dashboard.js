/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils', 'ojs/ojcontext'],
  function (ko, app, moduleUtils, accUtils, Context) {

    function DashboardViewModel() {
      var self = this;

      // Wait until header show up to resolve
      // var resolve = Context.getPageContext().getBusyContext().addBusyState({ description: "wait for header" });

      // self.dashboardHeaderSettings = {
      //   name: 'header',
      //   params: {
      //     pageTitle: self.selection.state().detail.label,
      //     transitionCompleted: app.adjustContentPadding(), //brackets?
      //     toggleDrawer: app.toggleDrawer,
      //     startBtn: {
      //       // id: 'navDrawerBtn',
      //       // click: app.toggleDrawer,
      //       // display: 'icons',
      //       // label: 'Back',
      //       icons: 'oj-fwk-icon oj-fwk-icon-hamburger',
      //       visible: true
      //     }
      //     //need to integrate this in 

      //     // endBtn: {
      //     //   visible: false
      //     // }
      //   }

      // };

      //  Header Config
      self.dashboardHeaderConfig = ko.observable({ 'view': [], 'viewModel': null });
      moduleUtils.createView({ 'viewPath': 'views/header.html' }).then(function (view) {
        self.dashboardHeaderConfig({ 'view': view, 'viewModel': app.getHeaderModel() })
        resolve();
      })

      //this is what it calls 

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function () {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        app.adjustContentPadding();
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
