'use strict';

var urlBase = "/api";

var module = angular.module("lbServices", ['ngResource']);

module.factory(
  "Task",
  ['LoopBackResource', 'LoopBackAuth', function(Resource, LoopBackAuth) {
    return Resource(
      urlBase + "/task_type/:id",
      { 'id': '@id' },
      {
        "create": {
          url: urlBase + "/task_type",
          method: "POST",

        },
        "updateOrCreate": {
          url: urlBase + "/task_type",
          method: "PUT",

        },
        "upsert": {
          url: urlBase + "/task_type",
          method: "PUT",

        },
        "exists": {
          url: urlBase + "/task_type/:id/exists",
          method: "GET",

        },
        "findById": {
          url: urlBase + "/task_type/:id",
          method: "GET",

        },
        "find": {
          url: urlBase + "/task_type",
          method: "GET",
          isArray: true,

        },
        "findOne": {
          url: urlBase + "/task_type/findOne",
          method: "GET",

        },
        "destroyById": {
          url: urlBase + "/task_type/:id",
          method: "DELETE",

        },
        "deleteById": {
          url: urlBase + "/task_type/:id",
          method: "DELETE",

        },
        "removeById": {
          url: urlBase + "/task_type/:id",
          method: "DELETE",

        },
        "count": {
          url: urlBase + "/task_type/count",
          method: "GET",

        },
        "prototype$updateAttributes": {
          url: urlBase + "/task_type/:id",
          method: "PUT",

        },
      }
    );
}]);


module.factory('LoopBackAuth', function() {
    return { accessTokenId: null };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  })
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          if (LoopBackAuth.accessTokenId) {
            config.headers.authorization = LoopBackAuth.accessTokenId;
          }
          return config || $q.when(config);
        }
      }
    }])
  .factory('LoopBackResource', [ '$resource', function($resource) {
    return function(url, params, actions) {
      var resource = $resource(url, params, actions);

      // Angular always calls POST on $save()
      // This hack is based on
      // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
      resource.prototype.$save = function(success, error) {
        // Fortunately, LoopBack provides a convenient `upsert` method
        // that exactly fits our needs.
        var result = resource.upsert.call(this, {}, this, success, error);
        return result.$promise || result;
      }

      return resource;
    };
}]);
