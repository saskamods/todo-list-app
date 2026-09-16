// Todo App - Local Storage Implementation

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentSort = 'priority';
        this.editingTaskId = null;
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add task
        document.getElementById('addBtn').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.filter-btn').classList.add('active');
                this.currentFilter = e.target.closest('.filter-btn').getAttribute('data-filter');
                this.render();
            });
        });

        // Action buttons
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importTasks(e));
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const prioritySelect = document.getElementById('prioritySelect');
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText === '') {
            this.showNotification('Silakan masukkan tugas!', 'warning');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            completed: false,
            createdAt: new Date().toLocaleString('id-ID'),
            dueDate: null
        };

        this.tasks.unshift(task);
        this.saveToLocalStorage();
        this.render();
        taskInput.value = '';
        prioritySelect.value = 'medium';
        this.showNotification('Tugas ditambahkan!', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
            this.render();
        }
    }

    deleteTask(id) {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToLocalStorage();
            this.render();
            this.showNotification('Tugas dihapus!', 'warning');
        }
    }

    openEditModal(id) {
        this.editingTaskId = id;
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            document.getElementById('editTaskInput').value = task.text;
            document.getElementById('editPriority').value = task.priority;
            document.getElementById('editDueDate').value = task.dueDate || '';
            document.getElementById('editModal').style.display = 'block';
        }
    }

    saveEditedTask(event) {
        event.preventDefault();
        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            task.text = document.getElementById('editTaskInput').value;
            task.priority = document.getElementById('editPriority').value;
            task.dueDate = document.getElementById('editDueDate').value || null;
            this.saveToLocalStorage();
            this.render();
            this.closeEditModal();
            this.showNotification('Tugas diperbarui!', 'success');
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('Tidak ada tugas yang selesai!', 'warning');
            return;
        }
        if (confirm(`Hapus ${completedCount} tugas yang selesai?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveToLocalStorage();
            this.render();
            this.showNotification('Tugas yang selesai dihapus!', 'success');
        }
    }

    clearAll() {
        if (this.tasks.length === 0) {
            this.showNotification('Tidak ada tugas untuk dihapus!', 'warning');
            return;
        }
        if (confirm(`Apakah Anda yakin ingin menghapus semua ${this.tasks.length} tugas?`)) {
            this.tasks = [];
            this.saveToLocalStorage();
            this.render();
            this.showNotification('Semua tugas dihapus!', 'warning');
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('todoTasks');
        this.tasks = saved ? JSON.parse(saved) : [];
    }

    exportTasks() {
        if (this.tasks.length === 0) {
            this.showNotification('Tidak ada tugas untuk diekspor!', 'warning');
            return;
        }
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showNotification('Tugas diekspor!', 'success');
    }

    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    if (confirm('Impor akan menggabungkan dengan tugas yang ada. Lanjutkan?')) {
                        this.tasks = [...this.tasks, ...imported];
                        this.saveToLocalStorage();
                        this.render();
                        this.showNotification(`${imported.length} tugas diimpor!`, 'success');
                    }
                } else {
                    this.showNotification('Format file tidak valid!', 'error');
                }
            } catch (err) {
                this.showNotification('Gagal mengimpor file!', 'error');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    getFilteredAndSortedTasks() {
        let filtered = this.tasks;

        // Filter
        switch (this.currentFilter) {
            case 'completed':
                filtered = filtered.filter(t => t.completed);
                break;
            case 'pending':
                filtered = filtered.filter(t => !t.completed);
                break;
            case 'high':
                filtered = filtered.filter(t => t.priority === 'high');
                break;
        }

        // Sort
        if (this.currentSort === 'priority') {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            filtered.sort((a, b) => {
                if (a.completed !== b.completed) return a.completed ? 1 : -1;
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        } else if (this.currentSort === 'time') {
            filtered.sort((a, b) => b.id - a.id);
        }

        return filtered;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
    }

    isOverdue(dueDate) {
        if (!dueDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate);
        due.setHours(0, 0, 0, 0);
        return due < today;
    }

    render() {
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredAndSortedTasks();

        this.updateStats();

        if (filteredTasks.length === 0) {
            tasksList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        tasksList.style.display = 'flex';
        emptyState.style.display = 'none';
        tasksList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}
                       onchange="app.toggleTask(${task.id})">
                <div class="task-content">
                    <div class="task-header">
                        <span class="task-text">${this.escapeHtml(task.text)}</span>
                        <span class="task-priority-badge ${task.priority}">${task.priority}</span>
                    </div>
                    <div class="task-meta">
                        <div class="task-date">
                            <i class="fas fa-clock"></i>
                            <span>${task.createdAt}</span>
                        </div>
                        ${task.dueDate ? `
                            <div class="task-due ${this.isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}">
                                <i class="fas fa-calendar"></i>
                                <span>${this.isOverdue(task.dueDate) && !task.completed ? '⚠️ Sudah jatuh tempo: ' : ''}${this.formatDate(task.dueDate)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn" title="Edit" onclick="app.openEditModal(${task.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete" title="Hapus" onclick="app.deleteTask(${task.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Global functions
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function sortTasks(type) {
    app.currentSort = type;
    app.render();
}

function quickAdd(text) {
    document.getElementById('taskInput').value = text;
    app.addTask();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
};

// Initialize app
const app = new TodoApp();