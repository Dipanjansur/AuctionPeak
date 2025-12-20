-- =======================================================
-- 1. USERS (10 Records)
-- Password for all is: "password" ($2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG)
-- =======================================================

INSERT INTO users (users_id, username, first_name, last_name, email, password, bio, is_premium, profile_pic) VALUES
                                                                                                                 (101, 'james_bond', 'James', 'Bond', 'james@mi6.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'License to bid.', 'VERIFIED', 'pic_james.jpg'),
                                                                                                                 (102, 'tony_stark', 'Tony', 'Stark', 'tony@stark.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Genius, billionaire, playboy, philanthropist.', 'VERIFIED', 'pic_tony.jpg'),
                                                                                                                 (103, 'bruce_wayne', 'Bruce', 'Wayne', 'bruce@wayne.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'I am the night.', 'FREE_TIER', 'pic_bruce.jpg'),
                                                                                                                 (104, 'peter_parker', 'Peter', 'Parker', 'peter@dailybugle.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Just your friendly neighborhood bidder.', 'VERIFIED', 'pic_peter.jpg'),
                                                                                                                 (105, 'natasha_romanoff', 'Natasha', 'Romanoff', 'natasha@shield.gov', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Spying for deals.', 'VERIFIED', 'pic_nat.jpg'),
                                                                                                                 (106, 'clark_kent', 'Clark', 'Kent', 'clark@planet.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Truth, justice, and auctions.', 'PAID', 'pic_clark.jpg'),
                                                                                                                 (107, 'diana_prince', 'Diana', 'Prince', 'diana@themyscira.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Antique weaponry collector.', 'PAID', 'pic_diana.jpg'),
                                                                                                                 (108, 'wade_wilson', 'Wade', 'Wilson', 'deadpool@merc.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Maximum effort bidding.', 'PAID', 'pic_wade.jpg'),
                                                                                                                 (109, 'loki_laufeyson', 'Loki', 'Laufeyson', 'loki@asgard.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Burdened with glorious purpose.', 'PAID', 'pic_loki.jpg'),
                                                                                                                 (110, 'thor_odinson', 'Thor', 'Odinson', 'thor@asgard.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Bring me another auction!', 'CORPORATE', 'pic_thor.jpg');

-- =======================================================
-- 2. AUCTIONS (10 Records)
-- =======================================================

INSERT INTO auctions (auction_id, name, auction_details, is_premium, auction_pic, start_time, end_time, created_by) VALUES
                                                                                                                        (201, 'Supercar Showdown', 'Rare luxury vehicles.', 'PAID', 'car_auction.jpg', '2024-01-01 10:00:00', '2024-01-05 18:00:00', 102),
                                                                                                                        (202, 'Vintage Comics', 'Golden age comic books.', 'PAID', 'comic_auction.jpg', '2024-02-10 09:00:00', '2024-02-15 17:00:00', 104),
                                                                                                                        (203, 'Asgardian Artifacts', 'Relics from the nine realms.', 'PAID', 'asgard_auction.jpg', '2024-03-01 12:00:00', '2024-03-03 12:00:00', 110),
                                                                                                                        (204, 'Stark Tech Expo', 'Prototype gadgets and gizmos.', 'CORPORATE', 'tech_auction.jpg', '2024-04-05 08:00:00', '2024-04-10 20:00:00', 102),
                                                                                                                        (205, 'Gotham Charity Gala', 'Fundraiser for Gotham City.', 'CORPORATE', 'gotham_auction.jpg', '2024-05-20 19:00:00', '2024-05-20 23:00:00', 103),
                                                                                                                        (206, 'Daily Planet Archive', 'Historical newspapers and photos.', 'PAID', 'news_auction.jpg', '2024-06-15 10:00:00', '2024-06-18 16:00:00', 106),
                                                                                                                        (207, 'Spy Gadgets Clearance', 'Decommissioned SHIELD gear.', 'PAID', 'spy_auction.jpg', '2024-07-01 09:00:00', '2024-07-07 18:00:00', 105),
                                                                                                                        (208, 'Amazonian Pottery', 'Handcrafted ancient pottery.', 'FREE_TIER', 'clay_auction.jpg', '2024-08-10 11:00:00', '2024-08-15 15:00:00', 107),
                                                                                                                        (209, 'Mercenary Garage Sale', 'Items found... mostly legally.', 'PAID', 'wade_auction.jpg', '2024-09-01 00:00:00', '2024-09-02 00:00:00', 108),
                                                                                                                        (210, 'TVA Confiscated Items', 'Items from pruned timelines.', 'CORPORATE', 'tva_auction.jpg', '2024-10-01 10:00:00', '2024-10-31 10:00:00', 109);

-- =======================================================
-- 3. ITEMS (10 Records)
-- =======================================================

INSERT INTO items (item_id, item_name, item_description, current_price, bio, status, pics, parent_auction_id, owner_id, bid_start_time, bid_end_time) VALUES
                                                                                                                                                          (301, '1967 Shelby Cobra', 'Mint condition classic car.', 1500000.00, 'A beauty on wheels.', 'LISTED', 'shelby.jpg', 201, 102, '2024-01-01 10:00:00', '2024-01-05 18:00:00'),
                                                                                                                                                          (302, 'Action Comics #1', 'First appearance of Superman.', 3200000.00, 'Graded 9.0.', 'LISTED', 'action1.jpg', 202, 104, '2024-02-10 09:00:00', '2024-02-15 17:00:00'),
                                                                                                                                                          (303, 'Mjolnir Replica', 'Prop used in movies.', 5000.00, 'Heavy.', 'LISTED', 'hammer.jpg', 203, 110, '2024-03-01 12:00:00', '2024-03-03 12:00:00'),
                                                                                                                                                          (304, 'Arc Reactor Prototype', 'Proof that Tony has a heart.', 500000.00, 'Powered down.', 'LISTED', 'arc.jpg', 204, 102, '2024-04-05 08:00:00', '2024-04-10 20:00:00'),
                                                                                                                                                          (305, 'Batarang Collection', 'Set of 5 unique designs.', 25000.00, 'Displayed in glass case.', 'LISTED', 'bats.jpg', 205, 103, '2024-05-20 19:00:00', '2024-05-20 23:00:00'),
                                                                                                                                                          (306, 'Typewriter of Lois Lane', 'Used for major scoops.', 1200.00, 'Vintage model.', 'LISTED', 'typewriter.jpg', 206, 106, '2024-06-15 10:00:00', '2024-06-18 16:00:00'),
                                                                                                                                                          (307, 'Black Widow Stingers', 'Wrist mounted props.', 8000.00, 'Safe for display.', 'DISPLAY', 'stingers.jpg', 207, 105, '2024-07-01 09:00:00', '2024-07-07 18:00:00'),
                                                                                                                                                          (308, 'Lasso of Truth (Replica)', 'Gold braided rope.', 300.00, 'Does not force truth.', 'DISPLAY', 'lasso.jpg', 208, 107, '2024-08-10 11:00:00', '2024-08-15 15:00:00'),
                                                                                                                                                          (309, 'Chimichanga Truck', 'Fully operational food truck.', 45000.00, 'Smells like grease.', 'PERSONAL', 'truck.jpg', 209, 108, '2024-09-01 00:00:00', '2024-09-02 00:00:00'),
                                                                                                                                                          (310, 'Chimichanga Truck', 'Fully operational food truck.', 45000.00, 'Smells like grease.', 'PERSONAL', 'truck.jpg', 209, 108, '2024-09-01 00:00:00', '2024-09-02 00:00:00'),
                                                                                                                                                          (311, 'Tesseract Cube', 'Glowing blue cube.', 1000000.00, 'Contains infinite power.', 'PERSONAL', 'cube.jpg', 210, 109, '2024-10-01 10:00:00', '2024-10-31 10:00:00');

-- =======================================================
-- 4. BIDS (10 Records)
-- =======================================================

INSERT INTO bids (bids_id, amount, users_id, bids_item_id, bid_time) VALUES
                                                                         (401, 1550000.00, 103, 301, '2024-01-02 14:00:00'), -- Bruce bids on Shelby
                                                                         (402, 1600000.00, 101, 301, '2024-01-03 09:00:00'), -- James Bond outbids Bruce
                                                                         (403, 3250000.00, 102, 302, '2024-02-11 10:00:00'), -- Tony bids on Comic
                                                                         (404, 5500.00, 109, 303, '2024-03-01 13:00:00'),   -- Loki bids on Mjolnir (ironic)
                                                                         (405, 510000.00, 104, 304, '2024-04-06 12:00:00'),   -- Peter bids on Arc Reactor
                                                                         (406, 26000.00, 108, 305, '2024-05-20 20:00:00'),   -- Wade bids on Batarangs
                                                                         (407, 1300.00, 105, 306, '2024-06-16 11:00:00'),    -- Natasha bids on Typewriter
                                                                         (408, 8500.00, 106, 307, '2024-07-02 15:00:00'),    -- Clark bids on Stingers
                                                                         (409, 350.00, 101, 308, '2024-08-11 16:00:00'),     -- James bids on Lasso
                                                                         (410, 50000.00, 102, 309, '2024-09-01 12:00:00');   -- Tony bids on Food Truck

-- =======================================================
-- 5. AUCTION PARTICIPANTS (Many-to-Many Linking)
-- =======================================================

INSERT INTO auction_participants (auction_id, user_id) VALUES
                                                           (201, 101), (201, 103), -- Bond and Wayne in Car Auction
                                                           (202, 102), (202, 110), -- Stark and Thor in Comic Auction
                                                           (203, 109), (203, 105), -- Loki and Natasha in Asgard Auction
                                                           (204, 104), (204, 108), -- Peter and Wade in Tech Auction
                                                           (205, 108), (205, 101), -- Wade and Bond in Gotham Auction
                                                           (206, 105), (206, 102), -- Natasha and Stark in News Auction
                                                           (207, 106), (207, 103), -- Clark and Wayne in Spy Auction
                                                           (208, 101), (208, 110), -- Bond and Thor in Pottery Auction
                                                           (209, 102), (209, 104), -- Stark and Peter in Garage Sale
                                                           (210, 107), (210, 103); -- Diana and Wayne in TVA Auction


-- =======================================================
-- 6. PERMISSIONS
-- Defining what actions are possible on which resources
-- Action: CREATE, READ, UPDATE, DELETE
-- Resource: AUCTION, ITEM, BID, USER_MANAGEMENT
-- =======================================================

INSERT INTO permission (permission_id, permission_name, action, resource) VALUES
-- Auction Permissions
(501, 'CREATE_AUCTION', 'CREATE', 'AUCTION'),
(502, 'VIEW_AUCTION',   'READ',   'AUCTION'),
(503, 'EDIT_AUCTION',   'UPDATE', 'AUCTION'),
(504, 'DELETE_AUCTION', 'DELETE', 'AUCTION'),

-- Item Permissions
(505, 'CREATE_ITEM', 'CREATE', 'ITEM'),
(506, 'VIEW_ITEM',   'READ',   'ITEM'),
(507, 'EDIT_ITEM',   'UPDATE', 'ITEM'),
(508, 'DELETE_ITEM', 'DELETE', 'ITEM'),

-- Bid Permissions
(509, 'PLACE_BID',        'CREATE', 'BID'),
(510, 'VIEW_BID_HISTORY', 'READ',   'BID'),
(511, 'CANCEL_BID',       'DELETE', 'BID'), -- Usually Admin/Mod only

-- Admin/User Management Permissions
(512, 'BAN_USER',     'UPDATE', 'USER_MANAGEMENT'),
(513, 'DELETE_USER',  'DELETE', 'USER_MANAGEMENT');


-- =======================================================
-- 7. ROLES
-- =======================================================

INSERT INTO roles (role_id, name) VALUES
                                      (1, 'ROLE_ADMIN'),
                                      (2, 'ROLE_MODERATOR'),
                                      (3, 'ROLE_USER');


-- =======================================================
-- 8. ROLE_PERMISSION (Linking Roles to Permissions)
-- =======================================================

-- 8.1. ADMIN (Role ID 1) - Gets EVERYTHING
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, permission_id FROM permission;

-- 8.2. MODERATOR (Role ID 2)
-- Mods can Read everything, and Delete/Edit content (Auctions/Items) to keep the site clean.
-- Mods cannot CREATE auctions (they just watch) and cannot Delete Users (usually).
INSERT INTO role_permission (role_id, permission_id) VALUES
                                                         (2, 502), (2, 503), (2, 504), -- Auction: Read, Edit, Delete
                                                         (2, 506), (2, 507), (2, 508), -- Item: Read, Edit, Delete
                                                         (2, 510), (2, 511),           -- Bid: Read, Delete (Cancel fraudulent bids)
                                                         (2, 512);                     -- User: Ban User (Update status)

-- 8.3. USER (Role ID 3)
-- Standard Users can Create and Read.
-- (Note: In code, you restrict Update/Delete to "Own" data, but they need the permission to do it at all).
INSERT INTO role_permission (role_id, permission_id) VALUES
                                                         (3, 501), (3, 502), (3, 503), (3, 504), -- Auction: CRUD
                                                         (3, 505), (3, 506), (3, 507), (3, 508), -- Item: CRUD
                                                         (3, 509), (3, 510);                     -- Bid: Place, Read


-- =======================================================
-- 9. ROLE_USER (Assigning Roles to existing Users)
-- Mapping Users (from previous step) to Roles
-- =======================================================

INSERT INTO role_user (role_id, users_id) VALUES
-- Admin
(1, 101), -- James Bond is ADMIN (License to kill... bugs)

-- Moderators
(2, 105), -- Natasha Romanoff is MODERATOR (She watches everything)
(2, 109), -- Loki is MODERATOR (Chaotic choice, but powerful)

-- Standard Users
(3, 102), -- Tony Stark
(3, 103), -- Bruce Wayne
(3, 104), -- Peter Parker
(3, 106), -- Clark Kent
(3, 107), -- Diana Prince
(3, 108), -- Wade Wilson
(3, 110); -- Thor
