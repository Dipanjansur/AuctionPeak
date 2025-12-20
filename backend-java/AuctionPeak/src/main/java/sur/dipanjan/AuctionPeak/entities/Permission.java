package sur.dipanjan.AuctionPeak.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "permission")
@Getter
@Setter
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "permission_id")
    private Long permissionId;

    @Column(name = "permission_name", nullable = false)
    private String permissionName;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "resource", nullable = false)
    private String resource;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "permissions")
    private Set<Role> parent_role;

}