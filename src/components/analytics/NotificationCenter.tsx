import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  timestamp: Date;
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (
    type: Notification['type'],
    message: string
  ) => {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type,
      message,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-400 hover:text-gray-500"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b ${
                    notification.read ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      {notification.type === 'success' && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {notification.type === 'error' && (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}