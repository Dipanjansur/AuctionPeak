package sur.dipanjan.AuctionPeak.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "users_id")
    private Long usersId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password")
    private String password;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_premium")
    private PremiumStatus isPremium;

    @Column(name = "profile_pic", length = 100)
    private String profilepic;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "users")
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<Role> usersRoles;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "participants")
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<Auction> participatedAuctions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "createdBy")
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<Auction> createdAuctions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "owner")
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<Item> ownedItems;

}