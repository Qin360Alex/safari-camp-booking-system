import { pgTable, text, timestamp, boolean, decimal, integer, date, time, jsonb } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  role: text('role').notNull().default('guest'), // 'guest' | 'admin'
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables: Safari Camp Lodge Management System -----------------------

// Accommodations/Rooms
export const accommodations = pgTable('accommodations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'tent', 'glamping', 'cabin', 'lodge'
  capacity: integer('capacity').notNull(),
  description: text('description'),
  pricePerNight: decimal('price_per_night', { precision: 10, scale: 2 }).notNull(),
  amenities: text('amenities').array(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Room Inventory for Availability Tracking
export const roomInventory = pgTable('room_inventory', {
  id: text('id').primaryKey(),
  accommodationId: text('accommodation_id').notNull(),
  date: date('date').notNull(),
  totalRooms: integer('total_rooms').notNull(),
  availableRooms: integer('available_rooms').notNull().default(0),
  versionNumber: integer('version_number').notNull().default(0), // For optimistic locking
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Bookings
export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'
  checkInDate: date('check_in_date').notNull(),
  checkOutDate: date('check_out_date').notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  paymentStatus: text('payment_status').notNull().default('unpaid'), // 'unpaid', 'paid', 'refunded'
  paymentMethod: text('payment_method'), // 'stripe' or 'mpesa'
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  mpesaTransactionId: text('mpesa_transaction_id'),
  specialRequests: text('special_requests'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Booking Line Items
export const bookingLineItems = pgTable('booking_line_items', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull(),
  accommodationId: text('accommodation_id').notNull(),
  checkInDate: date('check_in_date').notNull(),
  checkOutDate: date('check_out_date').notNull(),
  roomsBooked: integer('rooms_booked').notNull().default(1),
  pricePerNight: decimal('price_per_night', { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Guides
export const guides = pgTable('guides', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  fullName: text('full_name').notNull(),
  bio: text('bio'),
  specialties: text('specialties').array(),
  languages: text('languages').array(),
  contactPhone: text('contact_phone'),
  isActive: boolean('is_active').notNull().default(true),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Vehicles
export const vehicles = pgTable('vehicles', {
  id: text('id').primaryKey(),
  registrationNumber: text('registration_number').notNull().unique(),
  vehicleType: text('vehicle_type').notNull(),
  capacity: integer('capacity').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  maintenanceNotes: text('maintenance_notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Drivers
export const drivers = pgTable('drivers', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  fullName: text('full_name').notNull(),
  licenseNumber: text('license_number').notNull().unique(),
  isActive: boolean('is_active').notNull().default(true),
  contactPhone: text('contact_phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Transfers
export const transfers = pgTable('transfers', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull(),
  transferType: text('transfer_type').notNull(), // 'airport_pickup', 'airport_dropoff', 'custom'
  scheduledDate: date('scheduled_date').notNull(),
  scheduledTime: time('scheduled_time'),
  location: text('location').notNull(),
  destination: text('destination').notNull(),
  driverId: text('driver_id'),
  vehicleId: text('vehicle_id'),
  passengerCount: integer('passenger_count').notNull(),
  specialRequests: text('special_requests'),
  status: text('status').notNull().default('scheduled'), // 'scheduled', 'completed', 'cancelled'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Activities
export const activities = pgTable('activities', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  activityType: text('activity_type').notNull(),
  durationHours: decimal('duration_hours', { precision: 5, scale: 1 }),
  maxParticipants: integer('max_participants').notNull(),
  pricePerPerson: decimal('price_per_person', { precision: 10, scale: 2 }).notNull(),
  guideId: text('guide_id'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Activity Bookings
export const activityBookings = pgTable('activity_bookings', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull(),
  activityId: text('activity_id').notNull(),
  scheduledDate: date('scheduled_date').notNull(),
  scheduledTime: time('scheduled_time'),
  participantsCount: integer('participants_count').notNull(),
  pricePerPerson: decimal('price_per_person', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('scheduled'), // 'scheduled', 'completed', 'cancelled'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Guests
export const guests = pgTable('guests', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  passportNumber: text('passport_number'),
  nationality: text('nationality'),
  emergencyContactName: text('emergency_contact_name'),
  emergencyContactPhone: text('emergency_contact_phone'),
  dateOfBirth: date('date_of_birth'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: text('resource_id').notNull(),
  changes: jsonb('changes'),
  ipAddress: text('ip_address'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
})
