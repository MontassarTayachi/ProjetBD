package com.example.backend.Service;

import com.example.backend.Model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Role createRole(Role role);
    List<Role> getAllRoles();
    Optional<Role> getRoleById(Long id);
    Role getRoleByName(String name);
    Role updateRole(Long id, Role updatedRole);
    boolean deleteRole(Long id);
}
