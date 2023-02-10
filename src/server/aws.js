import aws from 'aws-sdk'

const region = 'us-west-2'
const bucketName = 'kaleimagebucket'
const accessKeyId = ''
const secretAccessKey= ''

const s3 = new aws.s3({
    region,
    bucketName,
    accessKeyId,
    secretAccessKey,
    signatureVersion: '4'
})