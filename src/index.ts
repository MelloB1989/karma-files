import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { S3Client } from "@aws-sdk/client-s3";
import { HonoS3Storage } from "@hono-storage/s3";

const app = new Hono()

app.use(
  '/*',
  cors({
    origin: '*',
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    maxAge: 600,
    credentials: true,
  })
)

const client = (accessKeyId: string, secretAccessKey: string) =>
  new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

const storage = new HonoS3Storage({
  key: (_, file) =>
    `karma-files/jd_images/${file.originalname}.${file.extension}`,
  bucket: AWS_BUCKET_NAME,
  params: {
    ACL: "public-read",
  },
  client: (c) => client(AWS_KEY, AWS_SECRET),
});

app.post("/upload", storage.single("file"), async (c) => {
  const body = await c.req.parseBody()
  return c.json({
    url: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/karma-files/jd_images/${body['file'].name.toString()}`
  })
});

export default app;