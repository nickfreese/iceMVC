/*
* - MVC code example.
* The 'app' function creates a compenent which can be defined seperately for each environment it exists in.
*/ 
var iceMVC = function(){

	var _this = this;
	this.model = {

        db:{
            routes:{},

            addRoutes: function(routeObj){
                for(key in routeObj){
                    this.routes[key] = routeObj[key];
                }
            },
        },

        getRoute: function(route){
            if(typeof this.db.routes[route] !== 'undefined'){
                return this.db.routes[route];
            }
            else{
                return null;
            }
        },

	};

    this.view = {

        templates: {},

        addTemplates: function(templateObj){
                for(key in templateObj){
                    this.templates[key] = templateObj[key];
                }
            },

        render: function(elem, template){
            elem.innerHTML = _this.view.templates[template];
        },

    };

    this.controller = {

        action: function(myAction){
             if(typeof myAction.route !== 'undefined' && typeof myAction.update !== 'undefined'){
                 var update = document.querySelector(myAction.update);
                 _this.view.render(update, _this.model.getRoute(myAction.route));
             }
             if(typeof myAction.callback !== 'undefined'){
                 myAction.callback(_this);
             }
        },

        init: function(options){
            var all = false;
        	if(typeof options !== 'undefined'){
                    all = options;
        	}
        	var reg = _this.controller.actionRegistry;
        	if(all == false){


        	for(let obj in reg){
        		if(reg[obj].route == 'default'){
                    _this.controller.action(reg[obj]);
        		}
        		else{
                document.querySelector(reg[obj].init[1]).addEventListener(reg[obj].init[0], function(e){
                	e = e || window.e;
                    _this.controller.action(reg[obj]);
                });
            }
        	}
        }
        else{
        	document.querySelector(all.init[1]).addEventListener(all.init[0], function(e){
                	e = e || window.e;
                    _this.controller.action(all);
            });
        }
        }

    };

};