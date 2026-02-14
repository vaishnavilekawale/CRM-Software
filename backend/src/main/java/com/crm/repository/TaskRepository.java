package com.crm.repository;

import com.crm.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findAll(Pageable pageable);
    Page<Task> findByStatus(Task.TaskStatus status, Pageable pageable);
    Page<Task> findByPriority(Task.TaskPriority priority, Pageable pageable);
    Page<Task> findByAssignedToId(Long userId, Pageable pageable);
}
