import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/TableOfContents";
import { BlogContent } from "@/components/BlogContent";

const blogPosts = {
  "scalable-apis-nodejs-postgresql": {
    title: "Building Scalable APIs with Node.js and PostgreSQL",
    date: "March 15, 2024",
    readTime: "8 min read",
    tags: ["Node.js", "PostgreSQL", "API Design", "Backend"],
    content: `
# Building Scalable APIs with Node.js and PostgreSQL

When building modern web applications, creating scalable and efficient APIs is crucial for success. In this comprehensive guide, we'll explore best practices for designing and implementing REST APIs using Node.js and PostgreSQL.

## Why Node.js and PostgreSQL?

Node.js provides excellent performance for I/O-intensive operations, making it ideal for API development. Combined with PostgreSQL's robust ACID compliance and powerful querying capabilities, this stack offers the perfect balance of performance and reliability.

## Database Design Principles

### 1. Normalization vs Denormalization

Start with a normalized database schema to ensure data integrity, then selectively denormalize for performance where needed:

\`\`\`sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts table with foreign key
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 2. Indexing Strategy

Proper indexing is crucial for query performance:

\`\`\`sql
-- Index on frequently queried columns
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Composite index for complex queries
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);
\`\`\`

## API Design Best Practices

### 1. RESTful Resource Design

Design your API endpoints around resources, not actions:

\`\`\`javascript
// Good: Resource-based URLs
GET    /api/users           // Get all users
GET    /api/users/:id       // Get specific user
POST   /api/users           // Create user
PUT    /api/users/:id       // Update user
DELETE /api/users/:id       // Delete user

// Bad: Action-based URLs
POST   /api/createUser
POST   /api/updateUser
POST   /api/deleteUser
\`\`\`

### 2. Error Handling

Implement consistent error handling across your API:

\`\`\`javascript
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: statusCode === 500 ? 'Internal server error' : message
  });
};
\`\`\`

## Performance Optimization

### 1. Connection Pooling

Use connection pooling to manage database connections efficiently:

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
\`\`\`

### 2. Caching Strategies

Implement multiple layers of caching:

\`\`\`javascript
const Redis = require('redis');
const client = Redis.createClient();

// Cache frequently accessed data
const getUserById = async (id) => {
  const cacheKey = \`user:\${id}\`;

  // Try cache first
  const cached = await client.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Query database
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  const user = result.rows[0];

  // Cache for 5 minutes
  await client.setex(cacheKey, 300, JSON.stringify(user));

  return user;
};
\`\`\`

## Security Considerations

### 1. Input Validation

Always validate and sanitize input data:

\`\`\`javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
\`\`\`

### 2. Rate Limiting

Protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
\`\`\`

## Testing Your API

### Unit Tests

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200);

    expect(res.body).toHaveProperty('users');
    expect(Array.isArray(res.body.users)).toBe(true);
  });
});
\`\`\`

## Monitoring and Logging

Implement comprehensive logging and monitoring:

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log API requests
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});
\`\`\`

## Conclusion

Building scalable APIs requires careful consideration of database design, performance optimization, security, and monitoring. By following these best practices and leveraging the strengths of Node.js and PostgreSQL, you can create robust APIs that handle growth effectively.

Remember to:
- Design with scalability in mind from the start
- Implement proper error handling and validation
- Use caching strategically
- Monitor your API's performance
- Test thoroughly

Start small, measure performance, and scale incrementally based on real-world usage patterns.
    `
  },
  "game-development-idea-to-prototype": {
    title: "Game Development: From Idea to Prototype",
    date: "March 8, 2024",
    readTime: "6 min read",
    tags: ["Game Development", "Unity", "Prototyping", "Design"],
    content: `
# Game Development: From Idea to Prototype

Turning a game idea into a working prototype is one of the most exciting phases of game development. This guide will walk you through the essential steps to transform your creative vision into a playable experience.

## The Ideation Phase

### Defining Your Core Concept

Every great game starts with a simple, compelling core idea. Ask yourself:
- What is the one thing that makes your game unique?
- Can you explain your game in one sentence?
- What emotion do you want players to feel?

\`\`\`
Example: "A puzzle game where players manipulate time to solve increasingly complex challenges."
\`\`\`

### Research and Validation

Before diving into development:
1. Study similar games in your genre
2. Identify what makes them successful
3. Find gaps or opportunities for innovation
4. Validate your idea with potential players

## Pre-Production Planning

### Game Design Document (GDD)

Create a concise GDD covering:

**Core Mechanics:**
- Primary gameplay loop
- Player actions and interactions
- Victory/failure conditions

**Technical Scope:**
- Target platform (PC, mobile, console)
- Art style and technical requirements
- Development timeline and milestones

**Example Unity Script Structure:**
\`\`\`csharp
public class GameManager : MonoBehaviour
{
    [Header("Game State")]
    public GameState currentState;

    [Header("Player Reference")]
    public PlayerController player;

    private void Start()
    {
        InitializeGame();
    }

    public void ChangeGameState(GameState newState)
    {
        currentState = newState;
        OnGameStateChanged?.Invoke(newState);
    }
}
\`\`\`

## Rapid Prototyping

### Start with the Core Loop

Focus on implementing your main gameplay mechanic first:

\`\`\`csharp
public class PlayerController : MonoBehaviour
{
    [Header("Movement")]
    public float moveSpeed = 5f;
    public float jumpForce = 10f;

    private Rigidbody2D rb;
    private bool isGrounded;

    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        HandleInput();
    }

    private void HandleInput()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);

        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        }
    }
}
\`\`\`

### Iterative Development

Follow these principles:
1. **Make it work** - Get basic functionality running
2. **Make it better** - Refine mechanics and add polish
3. **Make it scalable** - Structure code for future features

## Essential Prototyping Tools

### Unity Essentials

**Scene Management:**
\`\`\`csharp
using UnityEngine.SceneManagement;

public class SceneController : MonoBehaviour
{
    public void LoadScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }

    public void ReloadCurrentScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
\`\`\`

**Simple UI Framework:**
\`\`\`csharp
public class UIManager : MonoBehaviour
{
    [Header("UI Panels")]
    public GameObject mainMenuPanel;
    public GameObject gamePanel;
    public GameObject pausePanel;

    public void ShowPanel(GameObject panel)
    {
        HideAllPanels();
        panel.SetActive(true);
    }

    private void HideAllPanels()
    {
        mainMenuPanel.SetActive(false);
        gamePanel.SetActive(false);
        pausePanel.SetActive(false);
    }
}
\`\`\`

## Testing and Feedback

### Internal Testing

Create a testing checklist:
- [ ] Core mechanics work as intended
- [ ] Game doesn't crash in normal play
- [ ] Controls feel responsive
- [ ] Victory/failure states trigger correctly

### External Playtesting

When gathering feedback:
1. **Observe silently** - Watch how players interact
2. **Ask open questions** - "How did that feel?" vs "Did you like it?"
3. **Focus on behavior** - What players do vs what they say
4. **Test early and often** - Small, frequent tests are better

## Common Prototyping Mistakes

### Over-Engineering

❌ **Don't do this:**
\`\`\`csharp
// Complex inheritance hierarchy for a simple prototype
public abstract class BaseInteractable : MonoBehaviour, IInteractable, ISelectable
{
    // Hundreds of lines of abstract code...
}
\`\`\`

✅ **Do this instead:**
\`\`\`csharp
// Simple, direct implementation
public class Collectible : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            Destroy(gameObject);
        }
    }
}
\`\`\`

### Perfectionism

Remember: A prototype's job is to answer questions, not to be perfect.

## Technical Implementation Tips

### Modular Systems

\`\`\`csharp
[System.Serializable]
public class GameEvent
{
    public string eventName;
    public UnityEvent response;
}

public class EventTrigger : MonoBehaviour
{
    public GameEvent[] events;

    public void TriggerEvent(string eventName)
    {
        foreach (var gameEvent in events)
        {
            if (gameEvent.eventName == eventName)
            {
                gameEvent.response.Invoke();
            }
        }
    }
}
\`\`\`

### Debug Utilities

\`\`\`csharp
public class DebugManager : MonoBehaviour
{
    [Header("Debug Options")]
    public bool showFPS = true;
    public bool invincibleMode = false;

    private void OnGUI()
    {
        if (showFPS)
        {
            float fps = 1.0f / Time.deltaTime;
            GUI.Label(new Rect(10, 10, 100, 20), $"FPS: {fps:F1}");
        }
    }
}
\`\`\`

## Next Steps

Once your prototype proves your core concept:
1. **Expand gradually** - Add features one at a time
2. **Maintain the fun** - Don't lose sight of what made the prototype engaging
3. **Plan for production** - Consider how to scale your prototype architecture

## Conclusion

Successful prototypes focus on answering fundamental questions about your game's viability and fun factor. Keep scope small, iterate quickly, and don't be afraid to pivot if testing reveals issues with your core concept.

Remember: The goal isn't to build the final game—it's to prove that your idea works and is worth pursuing further.
    `
  },
  "microservices-architecture-lessons": {
    title: "Microservices Architecture: Lessons Learned",
    date: "February 28, 2024",
    readTime: "10 min read",
    tags: ["Microservices", "Architecture", "Backend", "DevOps"],
    content: `
# Microservices Architecture: Lessons Learned

After implementing microservices architecture in production for several high-traffic applications, I've learned valuable lessons about what works, what doesn't, and when to use this architectural pattern.

## When Microservices Make Sense

### The Sweet Spot

Microservices architecture is beneficial when:
- Your team has grown beyond 8-10 developers
- Different parts of your system have different scaling requirements
- You need to deploy features independently
- Different services require different technologies

### When to Avoid Microservices

❌ **Don't use microservices if:**
- You're building a new product (start with a monolith)
- Your team is small (< 5 developers)
- You don't have DevOps expertise
- Network latency is critical for your use case

## Key Lessons Learned

### 1. Start with a Monolith

The biggest mistake I see teams make is starting with microservices. Begin with a well-structured monolith and extract services when you hit clear boundaries.

**Evolution Path:**
\`\`\`
Monolith → Modular Monolith → Microservices
\`\`\`

### 2. Service Boundaries Are Critical

Poor service boundaries lead to:
- Excessive inter-service communication
- Data consistency issues
- Deployment coupling

**Good Boundary Example:**
\`\`\`javascript
// User Service - owns all user data
class UserService {
  async createUser(userData) {
    // Handle user creation
    await this.userRepository.create(userData);
    await this.eventBus.publish('user.created', { userId: user.id });
  }
}

// Order Service - doesn't duplicate user data
class OrderService {
  async createOrder(userId, orderData) {
    // Only stores userId reference, not user details
    const order = await this.orderRepository.create({
      userId,
      ...orderData
    });
  }
}
\`\`\`

### 3. Data Management Challenges

**Database Per Service Rule:**
Each microservice should own its data. Shared databases create coupling.

**Handling Distributed Transactions:**
\`\`\`javascript
// Saga Pattern Example
class OrderSaga {
  async processOrder(orderData) {
    try {
      // Step 1: Reserve inventory
      await this.inventoryService.reserve(orderData.items);

      // Step 2: Process payment
      await this.paymentService.charge(orderData.payment);

      // Step 3: Create order
      await this.orderService.create(orderData);

      // Step 4: Send confirmation
      await this.notificationService.sendConfirmation(orderData);

    } catch (error) {
      // Compensating actions
      await this.compensate(orderData, error);
    }
  }

  async compensate(orderData, error) {
    // Rollback operations in reverse order
    await this.inventoryService.unreserve(orderData.items);
    await this.paymentService.refund(orderData.payment);
  }
}
\`\`\`

## Technical Implementation

### Service Communication

**1. Synchronous Communication (HTTP/gRPC):**
\`\`\`javascript
// HTTP with circuit breaker
const CircuitBreaker = require('opossum');

const userServiceOptions = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};

const breaker = new CircuitBreaker(callUserService, userServiceOptions);

breaker.fallback(() => {
  return { id: null, name: 'Unknown User' };
});

async function callUserService(userId) {
  const response = await fetch(\`http://user-service/users/\${userId}\`);
  return response.json();
}
\`\`\`

**2. Asynchronous Communication (Events):**
\`\`\`javascript
// Event-driven architecture
class EventBus {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, handler) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(handler);
  }

  async publish(event, data) {
    const handlers = this.subscribers.get(event) || [];

    // Process events in parallel
    await Promise.all(
      handlers.map(handler =>
        this.safeExecute(handler, data)
      )
    );
  }

  async safeExecute(handler, data) {
    try {
      await handler(data);
    } catch (error) {
      console.error('Event handler failed:', error);
      // Send to dead letter queue
      await this.deadLetterQueue.send({ handler, data, error });
    }
  }
}
\`\`\`

### Service Discovery

**Kubernetes Service Discovery:**
\`\`\`yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
\`\`\`

**Application Code:**
\`\`\`javascript
// Environment-based service discovery
const getServiceUrl = (serviceName) => {
  if (process.env.NODE_ENV === 'production') {
    return \`http://\${serviceName}.default.svc.cluster.local\`;
  }
  return process.env[\`\${serviceName.toUpperCase()}_URL\`] || \`http://localhost:3000\`;
};

const userServiceUrl = getServiceUrl('user-service');
\`\`\`

## Operational Challenges

### 1. Monitoring and Observability

**Distributed Tracing:**
\`\`\`javascript
const opentelemetry = require('@opentelemetry/api');
const { NodeSDK } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  serviceName: 'order-service',
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();

// Usage in application code
const tracer = opentelemetry.trace.getTracer('order-service');

async function processOrder(orderId) {
  const span = tracer.startSpan('process-order');

  try {
    span.setAttributes({ orderId });

    // Your business logic here
    const user = await getUserDetails(userId);
    const inventory = await checkInventory(items);

    span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message
    });
    throw error;
  } finally {
    span.end();
  }
}
\`\`\`

### 2. Configuration Management

**Centralized Configuration:**
\`\`\`javascript
class ConfigService {
  constructor() {
    this.config = new Map();
    this.loadConfig();
  }

  async loadConfig() {
    try {
      // Load from Kubernetes ConfigMap or external service
      const response = await fetch('http://config-service/config');
      const config = await response.json();

      Object.entries(config).forEach(([key, value]) => {
        this.config.set(key, value);
      });
    } catch (error) {
      console.error('Failed to load config:', error);
      // Fallback to environment variables
      this.loadFromEnvironment();
    }
  }

  get(key, defaultValue = null) {
    return this.config.get(key) || process.env[key] || defaultValue;
  }
}
\`\`\`

### 3. Deployment Strategies

**Blue-Green Deployment Script:**
\`\`\`bash
#!/bin/bash

SERVICE_NAME=$1
NEW_VERSION=$2
NAMESPACE="default"

# Deploy new version to green environment
kubectl set image deployment/\${SERVICE_NAME}-green \
  \${SERVICE_NAME}=\${SERVICE_NAME}:\${NEW_VERSION} \
  -n \${NAMESPACE}

# Wait for rollout to complete
kubectl rollout status deployment/\${SERVICE_NAME}-green -n \${NAMESPACE}

# Run health checks
if ./health-check.sh \${SERVICE_NAME}-green; then
  echo "Health checks passed, switching traffic"

  # Switch service to point to green deployment
  kubectl patch service \${SERVICE_NAME} \
    -p '{"spec":{"selector":{"version":"green"}}}' \
    -n \${NAMESPACE}

  echo "Deployment successful"
else
  echo "Health checks failed, rolling back"
  kubectl rollout undo deployment/\${SERVICE_NAME}-green -n \${NAMESPACE}
  exit 1
fi
\`\`\`

## Performance Considerations

### 1. Caching Strategies

**Multi-Level Caching:**
\`\`\`javascript
class CacheManager {
  constructor() {
    this.localCache = new Map();
    this.redisClient = redis.createClient();
  }

  async get(key) {
    // L1: Check local cache
    if (this.localCache.has(key)) {
      return this.localCache.get(key);
    }

    // L2: Check Redis
    const redisValue = await this.redisClient.get(key);
    if (redisValue) {
      const parsed = JSON.parse(redisValue);
      // Store in local cache for faster access
      this.localCache.set(key, parsed);
      return parsed;
    }

    return null;
  }

  async set(key, value, ttl = 300) {
    this.localCache.set(key, value);
    await this.redisClient.setex(key, ttl, JSON.stringify(value));
  }
}
\`\`\`

### 2. Database Optimization

**Connection Pooling Per Service:**
\`\`\`javascript
const { Pool } = require('pg');

class DatabaseManager {
  constructor() {
    this.pools = new Map();
  }

  getPool(database) {
    if (!this.pools.has(database)) {
      this.pools.set(database, new Pool({
        host: process.env.DB_HOST,
        database: database,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: 10, // Smaller pool per service
        idleTimeoutMillis: 30000
      }));
    }
    return this.pools.get(database);
  }
}
\`\`\`

## Security in Microservices

### Service-to-Service Authentication

**JWT Token Validation:**
\`\`\`javascript
const jwt = require('jsonwebtoken');

function authenticateService(req, res, next) {
  const token = req.headers['x-service-token'];

  if (!token) {
    return res.status(401).json({ error: 'Service token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SERVICE_SECRET);
    req.serviceId = decoded.serviceId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid service token' });
  }
}

// Usage
app.use('/internal', authenticateService);
\`\`\`

## Key Takeaways

### What Worked Well

1. **Independent deployments** - Reduced coordination overhead
2. **Technology diversity** - Right tool for each job
3. **Fault isolation** - Service failures don't cascade
4. **Team autonomy** - Teams can move independently

### What Didn't Work

1. **Over-decomposition** - Too many small services created overhead
2. **Shared databases** - Violated service boundaries
3. **Synchronous communication** - Created tight coupling
4. **Insufficient monitoring** - Hard to debug distributed issues

### Best Practices Summary

1. **Start simple** - Begin with a monolith
2. **Design for failure** - Use circuit breakers and timeouts
3. **Embrace eventual consistency** - Use event sourcing where appropriate
4. **Invest in tooling** - Monitoring, logging, and deployment automation are critical
5. **Document everything** - Service contracts, data flows, and runbooks

## Conclusion

Microservices are a powerful architectural pattern, but they come with significant complexity. Success requires careful planning, robust operational practices, and a team experienced with distributed systems.

Consider microservices when you have clear service boundaries, experienced teams, and operational maturity. Otherwise, a well-structured monolith might serve you better.

The journey from monolith to microservices should be evolutionary, not revolutionary.
    `
  }
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="VALCODE Logo" className="h-8 w-auto mr-2" />
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              VALCODE
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</Link>
            <Link href="/#skills" className="text-gray-600 hover:text-gray-900 transition-colors">Skills</Link>
            <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
            <Link href="/resume.html" target="_blank" className="text-gray-600 hover:text-gray-900 transition-colors">Resume</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">


              {/* Header */}
              <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                <Separator />
              </div>

              {/* Content */}
              <div className="max-w-none">
                <BlogContent content={post.content} />
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      More Articles
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                </div>
              </div>
            </article>

            {/* Table of Contents Sidebar */}
            <aside className="lg:col-span-1">
              <TableOfContents content={post.content} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}