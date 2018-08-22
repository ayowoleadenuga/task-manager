$(document).ready(function(){
    // to add new task
    $('#add-task-form').on('submit', function(e){
       addTask(e);
   });
    // to edit existing task
    $('#edit-task-form').on('submit', function(){
        updateTask();
    })

    // remove event
    $('#task-table').on('click','#remove-task', function(){
        id= $(this).data('id');
        removeTask(id);
    })

    // clear tasks event
    $('#clear-tasks').on('click', function(){
        clearAllTasks();
    })

    displayTasks();

    //    funtion to display new tasks
    function displayTasks(){
        var taskList = JSON.parse(localStorage.getItem('tasks'));

        if(taskList != null){
            taskList = taskList.sort(sortByTime);
        }

        // set counter
        var i = 0;
        // check tasks
        if(localStorage.getItem('tasks') != null){
            // loop through and display
            $.each(taskList, function(key, value){
                $('#task-table').append('<tr id="'+ value.id +'">' +
                                    '<td>' + value.task + '</td>' +
                                    '<td>' + value.task_priority + '</td>' +
                                    '<td>' + value.task_date + '</td>' +
                                    '<td>' + value.task_time + '</td>' +
                                    '<td><a href="edit.html"?id='+ value.id +'">Edit</a> | <a href="#" id="remove-task" data-id="'+value.id+'">Remove</a></td>' +
                                    '</tr>');
            })
        }
    }

    // function to sort tasks
    function sortByTime(a, b){
        var aTime = a.task_time;
        var bTime = b.task_time;
        return((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
    }
    
    //    function to add task
    function addTask(e){
        //    add unique ID
        var newDate = new Date();
        var  id = newDate.getTime();

        var task = $('#task').val();
        var task_priority = $('#priority').val();
        var task_date = $('#date').val();
        var task_time = $('#time').val();

        // validation
        if(task == ''){
            alert('Please input task');
            e.preventDefault();
        } else if(task_date == '') {
            alert('Please input date');
            e.preventDefault();
        } else if(task_time == '') {
            alert('Please input time');
            e.preventDefault();
        } else if (task_priority == ''){
            task_priority = 'normal';
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));

            // to check for tasks
            if(tasks == null){
                tasks = [];
            }

            var taskList = JSON.parse(localStorage.getItem('tasks'));

            // new task object
            var new_task = {
                "id": id,
                "task": task,
                "task_priority": task_priority,
                "task_date": task_date,
                "task_time": task_time
            }

            tasks.push(new_task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    // function to remove task
    function removeTask(id){
        if(confirm('Are you sure you want to delete this task?')){
            var taskList = JSON.parse(localStorage.getItem('tasks'));

            for(var i=0; i < taskList.length; i++){
                if(taskList[i].id == id){
                    taskList.splice(i,1)
                }
                localStorage.setItem('tasks', JSON.stringify(taskList));
            }
            location.reload();
        }
    }
    // to clear all tasks
    function clearAllTasks(){
        if(confirm('Do you want to clear all tasks?')){
            localStorage.clear();
            location.reload();
        }
    }
});
// getting a single task
function getTask(){
    var $_GET = getQueryParams(document.location.search);
    var id = $_GET['id'];

    var taskList = JSON.parse(localStorage.getItem('tasks'));

    for (var i=0; i < taskList.length; i++){
        if(taskList[i].id == id){
            $('#edit-task-form #task_id').val(taskList[i].id);
            $('#edit-task-form #task').val(taskList[i].task);
            $('#edit-task-form #priority').val(taskList[i].task_priority);
            $('#edit-task-form #date').val(taskList[i].task_date);
            $('#edit-task-form #time').val(taskList[i].task_time);
        }
    }
} 
// function to get HTTP GET requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}