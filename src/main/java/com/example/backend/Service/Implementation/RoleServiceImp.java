package com.example.backend.Service.Implementation;

import com.example.backend.Model.Role;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImp implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // Create
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    // Read
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public Role getRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    // Update
    public Role updateRole(Long id, Role updatedRole) {
        if (roleRepository.existsById(id)) {
            updatedRole.setId(id);
            return roleRepository.save(updatedRole);
        }
        return null;
    }

    // Delete
    public boolean deleteRole(Long id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
