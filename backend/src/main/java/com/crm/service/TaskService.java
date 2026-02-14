package com.crm.service;

import com.crm.dto.TaskDto;
import com.crm.model.Task;
import com.crm.model.User;
import com.crm.repository.TaskRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public TaskDto createTask(TaskDto taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());

        try {
            task.setPriority(Task.TaskPriority.valueOf(taskDto.getPriority().toUpperCase()));
            task.setStatus(Task.TaskStatus.valueOf(taskDto.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            task.setPriority(Task.TaskPriority.MEDIUM);
            task.setStatus(Task.TaskStatus.OPEN);
        }

        if (taskDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(taskDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(assignedTo);
        }

        if (taskDto.getCreatedById() != null) {
            User createdBy = userRepository.findById(taskDto.getCreatedById())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setCreatedBy(createdBy);
        }

        Task savedTask = taskRepository.save(task);
        return convertToDto(savedTask);
    }

    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());

        try {
            task.setPriority(Task.TaskPriority.valueOf(taskDto.getPriority().toUpperCase()));
            task.setStatus(Task.TaskStatus.valueOf(taskDto.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            // Keep existing values
        }

        if (taskDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(taskDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(assignedTo);
        }

        // If status is COMPLETED, set completed time
        if ("COMPLETED".equalsIgnoreCase(taskDto.getStatus())) {
            task.setCompletedAt(LocalDateTime.now());
        }

        Task updatedTask = taskRepository.save(task);
        return convertToDto(updatedTask);
    }

    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return convertToDto(task);
    }

    public Page<TaskDto> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable).map(this::convertToDto);
    }

    public Page<TaskDto> getTasksByStatus(String status, Pageable pageable) {
        try {
            Task.TaskStatus taskStatus = Task.TaskStatus.valueOf(status.toUpperCase());
            return taskRepository.findByStatus(taskStatus, pageable).map(this::convertToDto);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }

    public Page<TaskDto> getTasksByUserId(Long userId, Pageable pageable) {
        return taskRepository.findByAssignedToId(userId, pageable).map(this::convertToDto);
    }

    public Page<TaskDto> getTasksByPriority(String priority, Pageable pageable) {
        try {
            Task.TaskPriority taskPriority = Task.TaskPriority.valueOf(priority.toUpperCase());
            return taskRepository.findByPriority(taskPriority, pageable).map(this::convertToDto);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid priority: " + priority);
        }
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }
        taskRepository.deleteById(id);
    }

    private TaskDto convertToDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setPriority(task.getPriority().toString());
        dto.setStatus(task.getStatus().toString());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        dto.setCompletedAt(task.getCompletedAt());

        if (task.getAssignedTo() != null) {
            dto.setAssignedToId(task.getAssignedTo().getId());
            dto.setAssignedToName(task.getAssignedTo().getFullName());
        }

        if (task.getCreatedBy() != null) {
            dto.setCreatedById(task.getCreatedBy().getId());
            dto.setCreatedByName(task.getCreatedBy().getFullName());
        }

        return dto;
    }
}
