# Data Stream Processing Workshop

Below is a list of resources created in this workshop. Delete each one to clean up your account after executing the modules.

## Resource Cleanup Instructions

### 1. AWS Lambda
Delete the AWS Lambda function, IAM role and Amazon DynamoDB table you created in module 3.

<details>
<summary><strong>Step-by-step instructions (expand for details)</strong></summary><p>
   
  #### WildRydesStreamProcessor_Location function

   1. In the AWS Management Console, click **Services** then select **Lambda** under Compute.

   1. Click the radio button next to **WildRydesStreamProcessor_Location**.

   1. Click **Actions** and **Delete**. Click the **Delete** button to confirm the deletion.

</p></details>

 #### serverlessrepo-Geocode-GeocodeFunction-* function

   (* it contains auto-generated unique value after your function name)

   <details>
   <summary><strong>Step-by-step instructions (expand for details)</strong></summary><p>

   1.	Click on **Services** then select **Lambda** in the Compute section

   1. Click the radio button next to **serverlessrepo-Geocode-GeocodeFunction-***

   1. Click **Actions** and **Delete**. Click the **Delete** button to confirm the deletion.

   </p></details>

 #### serverlessrepo-Geocode-GeocodeSuggestFunction-* function

   (* it contains auto-generated unique value after your function name)

   <details>
   <summary><strong>Step-by-step instructions (expand for details)</strong></summary><p>

   1.	Click on **Services** then select **Lambda** in the Compute section

   1. Click the radio button next to **serverlessrepo-Geocode-GeocodeSuggestFunction-***

   1. Click **Actions** and **Delete**. Click the **Delete** button to confirm the deletion.

   </p></details>

### 2. Amazon DynamoDB

 #### UnicornLocation table
   <details>
   <summary><strong>Step-by-step instructions (expand for details)</strong></summary><p>

   1.	Click on **Services** then select **DynamoDB** in the Database section.

   2.	Click **Tables** from the left-hand navigation

   3.	Click the radio button next to **UnicornLocation**.

   4.	Click **Delete table** and click **Delete** to confirm the deletion.

   </p></details>

### 3. AWS IAM

 #### WildRydesDynamoDBWritePolicy_Location policy
   <details>
   <summary><strong>Step-by-step instructions (expand for details)</strong></summary><p>

   1.	Click on Services then select IAM in the Security, Identity & Compliance section.

   2.	Click Policies from the left-hand navigation.

   3.	Select Customer managed from Filter.

   4.	Click the checkbox next to WildRydesDynamoDBWritePolicy_Location.

   5.	Click Policy actions and Delete. Click the Delete button to confirm the deletion.

   </p></details>

 #### WildRydesStreamProcessorRole_Location role

   <details>
   <summary><strong>Step-by-step instructions (expand for details)</strong></summary><p>

   1.	Click Roles from the left-hand navigation.

   2.	Click the checkbox next to WildRydesStreamProcessorRole_Location.

   3.	Click Delete role and click Yes, delete to confirm the deletion.

   </p></details>











