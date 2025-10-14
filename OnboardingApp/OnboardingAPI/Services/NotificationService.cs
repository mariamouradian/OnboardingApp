using Microsoft.EntityFrameworkCore;
using OnboardingAPI.Data;
using OnboardingAPI.Interfaces;
using OnboardingAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnboardingAPI.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _context;

        public NotificationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateNotification(string message, int? employeeId, int? taskId, int departmentId, NotificationType type)
        {
            var notification = new Notification
            {
                Message = message,
                EmployeeId = employeeId,
                TaskId = taskId,
                DepartmentId = departmentId,
                Type = type,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Notification>> GetNotificationsForHR(int departmentId)
        {
            return await _context.Notifications
                .Where(n => n.DepartmentId == departmentId)
                .OrderByDescending(n => n.CreatedAt)
                .Take(50)
                .ToListAsync();
        }

        public async Task<bool> MarkAsRead(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null) return false;

            notification.IsRead = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetUnreadCount(int departmentId)
        {
            return await _context.Notifications
                .Where(n => n.DepartmentId == departmentId && !n.IsRead)
                .CountAsync();
        }

        public async Task<int> MarkAllAsRead(int departmentId)
        {
            var unreadNotifications = await _context.Notifications
                .Where(n => n.DepartmentId == departmentId && !n.IsRead)
                .ToListAsync();

            foreach (var notification in unreadNotifications)
            {
                notification.IsRead = true;
            }

            await _context.SaveChangesAsync();
            return unreadNotifications.Count;
        }

        public async Task<bool> DeleteNotification(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null) return false;

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Notification?> GetNotificationById(int notificationId)
        {
            return await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId);
        }

        public async Task<List<Notification>> GetNotificationsForEmployee(int employeeId)
        {
            return await _context.Notifications
                .Where(n => n.EmployeeId == employeeId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Notification>> GetNotificationsByType(int departmentId, NotificationType type)
        {
            return await _context.Notifications
                .Where(n => n.DepartmentId == departmentId && n.Type == type)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<int> CleanupOldNotifications(int days = 30)
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-days);

            var oldNotifications = await _context.Notifications
                .Where(n => n.CreatedAt < cutoffDate)
                .ToListAsync();

            int deletedCount = oldNotifications.Count;

            _context.Notifications.RemoveRange(oldNotifications);
            await _context.SaveChangesAsync();

            return deletedCount;
        }
    }
}