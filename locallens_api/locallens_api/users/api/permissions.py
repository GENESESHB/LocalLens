from rest_framework import permissions


class IsSuperuserOrSelf(permissions.BasePermission):
    """
    Custom permission to only allow superusers to view
    any user or users to view their own details.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_superuser
