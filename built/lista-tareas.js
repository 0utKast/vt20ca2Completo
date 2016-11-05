System.register(['@angular/core', '@angular/platform-browser-dynamic'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_dynamic_1;
    var TaskService, FormattedTimePipe, QueuedOnlyPipe, TaskTooltipDirective, TaskIconsComponent, TasksComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            }],
        execute: function() {
            /// Servicio de Datos Locales
            TaskService = (function () {
                function TaskService() {
                    this.taskStore = [];
                    var tasks = [
                        {
                            name: "Preparar guión Videotutorial",
                            deadline: "03 Nov 2016",
                            tareasRequeridas: 2
                        }, {
                            name: "Buscar imágenes y videos",
                            deadline: "03 Nov 2016",
                            tareasRequeridas: 1
                        }, {
                            name: "Grabación Completa",
                            deadline: "04 Nov 2016",
                            tareasRequeridas: 2
                        }, {
                            name: "Edición y Producción",
                            deadline: "05 Nov 2016",
                            tareasRequeridas: 3
                        }
                    ];
                    this.taskStore = tasks.map(function (task) {
                        return {
                            name: task.name,
                            deadline: new Date(task.deadline),
                            queued: false,
                            tareasRequeridas: task.tareasRequeridas
                        };
                    });
                }
                return TaskService;
            }());
            /// Pipes Personalizados
            FormattedTimePipe = (function () {
                function FormattedTimePipe() {
                }
                FormattedTimePipe.prototype.transform = function (totalMinutes) {
                    var minutes = totalMinutes % 60;
                    var hours = Math.floor(totalMinutes / 60);
                    return hours + "h:" + minutes + "m";
                };
                FormattedTimePipe = __decorate([
                    core_1.Pipe({
                        name: 'formateoHoraTareas'
                    }), 
                    __metadata('design:paramtypes', [])
                ], FormattedTimePipe);
                return FormattedTimePipe;
            }());
            QueuedOnlyPipe = (function () {
                function QueuedOnlyPipe() {
                }
                QueuedOnlyPipe.prototype.transform = function (tasks) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return tasks.filter(function (task) {
                        return task.queued === args[0];
                    });
                };
                QueuedOnlyPipe = __decorate([
                    core_1.Pipe({
                        name: 'tareaQueuedOnly',
                        pure: false
                    }), 
                    __metadata('design:paramtypes', [])
                ], QueuedOnlyPipe);
                return QueuedOnlyPipe;
            }());
            /// Custom Directives
            TaskTooltipDirective = (function () {
                function TaskTooltipDirective() {
                }
                TaskTooltipDirective.prototype.onMouseOver = function () {
                    if (!this.defaultTooltipText && this.taskTooltip) {
                        this.defaultTooltipText = this.taskTooltip.innerText;
                    }
                    this.taskTooltip.innerText = this.task.name;
                };
                TaskTooltipDirective.prototype.onMouseOut = function () {
                    if (this.taskTooltip) {
                        this.taskTooltip.innerText = this.defaultTooltipText;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TaskTooltipDirective.prototype, "task", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TaskTooltipDirective.prototype, "taskTooltip", void 0);
                __decorate([
                    core_1.HostListener('mouseover'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], TaskTooltipDirective.prototype, "onMouseOver", null);
                __decorate([
                    core_1.HostListener('mouseout'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], TaskTooltipDirective.prototype, "onMouseOut", null);
                TaskTooltipDirective = __decorate([
                    core_1.Directive({
                        selector: '[task]'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TaskTooltipDirective);
                return TaskTooltipDirective;
            }());
            /// Component classes
            /// - Child Icon Component
            TaskIconsComponent = (function () {
                function TaskIconsComponent() {
                    this.icons = [];
                }
                TaskIconsComponent.prototype.ngOnInit = function () {
                    this.icons.length = this.task.tareasRequeridas;
                    this.icons.fill({ name: this.task.name });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TaskIconsComponent.prototype, "task", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], TaskIconsComponent.prototype, "size", void 0);
                TaskIconsComponent = __decorate([
                    core_1.Component({
                        selector: 'tarea-task-icons',
                        template: "<img *ngFor=\"let icon of icons\"\n                  src=\"/assets/img/reloj2.png\"\n                  width=\"{{size}}\">"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TaskIconsComponent);
                return TaskIconsComponent;
            }());
            /// - Main Parent Component
            TasksComponent = (function () {
                function TasksComponent() {
                    this.queueHeaderMapping = {
                        '=0': 'Sin tareas',
                        '=1': 'Una tarea',
                        'other': '# tareas'
                    };
                    var taskService = new TaskService();
                    this.tasks = taskService.taskStore;
                    this.today = new Date();
                    this.actualizarTareasEnCola();
                }
                TasksComponent.prototype.toggleTask = function (task) {
                    task.queued = !task.queued;
                    this.actualizarTareasEnCola();
                };
                TasksComponent.prototype.actualizarTareasEnCola = function () {
                    this.queuedTareas = this.tasks
                        .filter(function (task) { return task.queued; })
                        .reduce(function (tareas, queuedTask) {
                        return tareas + queuedTask.tareasRequeridas;
                    }, 0);
                };
                TasksComponent = __decorate([
                    core_1.Component({
                        selector: 'lista-tareas',
                        directives: [TaskIconsComponent, TaskTooltipDirective],
                        pipes: [FormattedTimePipe, QueuedOnlyPipe],
                        styleUrls: ['lista-tareas.css'],
                        templateUrl: 'lista-tareas.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TasksComponent);
                return TasksComponent;
            }());
            ;
            platform_browser_dynamic_1.bootstrap(TasksComponent);
        }
    }
});
