import {
  Component,
  Input,
  Pipe,
  Directive,
  PipeTransform,
  OnInit,
  HostListener
} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

/// Modelo interface

interface Task {
  name: string;
  deadline: Date;
  queued: boolean;
  tareasRequeridas: number;
}

/// Servicio de Datos Locales
class TaskService {
  public taskStore: Task[] = [];

  constructor() {
    const tasks = [
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

    this.taskStore = tasks.map(task => {
      return {
        name: task.name,
        deadline: new Date(task.deadline),
        queued: false,
        tareasRequeridas: task.tareasRequeridas
      };
    });
  }
}

/// Pipes Personalizados

@Pipe({
  name: 'formateoHoraTareas'
})
class FormattedTimePipe implements PipeTransform {
  transform(totalMinutes: number): string {
    let minutes: number = totalMinutes % 60;
    let hours: number = Math.floor(totalMinutes / 60);
    return `${hours}h:${minutes}m`;
  }
}

@Pipe({
  name: 'tareaQueuedOnly',
  pure: false
})
class QueuedOnlyPipe implements PipeTransform {
  transform(tasks: Task[], ...args: any[]): Task[] {
    return tasks.filter((task: Task) => {
      return task.queued === args[0];
    });
  }
}

/// Custom Directives

@Directive({
  selector: '[task]'
})
class TaskTooltipDirective {
  private defaultTooltipText: string;
  @Input() task: Task;
  @Input() taskTooltip: any;

  @HostListener('mouseover')
  onMouseOver() {
    if (!this.defaultTooltipText && this.taskTooltip) {
      this.defaultTooltipText = this.taskTooltip.innerText;
    }
    this.taskTooltip.innerText = this.task.name;
  }
  @HostListener('mouseout')
  onMouseOut() {
    if (this.taskTooltip) {
      this.taskTooltip.innerText = this.defaultTooltipText;
    }
  }
}

/// Component classes

/// - Child Icon Component

@Component({
  selector: 'tarea-task-icons',
  template: `<img *ngFor="let icon of icons"
                  src="/assets/img/reloj2.png"
                  width="{{size}}">`
})
class TaskIconsComponent implements OnInit {
  @Input() task: Task;
  @Input() size: number;
  icons: Object[] = [];

  ngOnInit() {
    this.icons.length = this.task.tareasRequeridas;
    this.icons.fill({ name: this.task.name });
  }
}

/// - Main Parent Component

@Component({
  selector: 'lista-tareas',
  directives: [TaskIconsComponent, TaskTooltipDirective],
  pipes: [FormattedTimePipe, QueuedOnlyPipe],
  styleUrls: ['lista-tareas.css'],
  templateUrl: 'lista-tareas.html'
})
class TasksComponent {
  today: Date;
  tasks: Task[];
  queuedTareas: number;
  queueHeaderMapping: any = {
    '=0': 'Sin tareas',
    '=1': 'Una tarea',
    'other': '# tareas'
  };

  constructor() {
    const taskService: TaskService = new TaskService();
    this.tasks = taskService.taskStore;
    this.today = new Date();
    this.actualizarTareasEnCola();
  }

  toggleTask(task: Task): void {
    task.queued = !task.queued;
    this.actualizarTareasEnCola();
  }

  private actualizarTareasEnCola(): void {
    this.queuedTareas = this.tasks
      .filter((task: Task) => task.queued)
      .reduce((tareas: number, queuedTask: Task) => {
      return tareas + queuedTask.tareasRequeridas;
    }, 0);
  }
};

bootstrap(TasksComponent);
