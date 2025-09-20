import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users, Code, ExternalLink } from 'lucide-react'
import CodeExample from '@/components/CodeExample'
import EndpointCard from '@/components/EndpointCard'

const PartnerApiPage = () => {
  const endpoints = [
    {
      title: 'External Wallet APIs',
      description: 'APIs for external partners to manage wallets, check balances, and view transaction summaries',
      baseUrl: '/partner/v1/wallet',
      methods: [
        {
          method: 'GET',
          path: '/me',
          description: 'Get authenticated user\'s wallet details',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "walletId": "wallet_abc123def456",
    "userId": "user_xyz789",
    "currency": "UGX",
    "balance": 1000.50,
    "availableBalance": 950.00,
    "status": "ACTIVE",
    "isActive": true,
    "createdAt": "2023-01-01T10:00:00Z",
    "updatedAt": "2023-01-05T15:30:00Z"
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            notFound: {
              code: 404,
              description: 'Not Found',
              example: `{
  "success": false,
  "error": {
    "code": 404,
    "message": "Wallet not found",
    "details": "The specified wallet does not exist or is not accessible"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/me/balance',
          description: 'Get wallet balance information',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "walletId": "wallet_abc123def456",
    "currency": "UGX",
    "balance": 1000.50,
    "availableBalance": 950.00,
    "pendingBalance": 50.50,
    "lockedBalance": 0.00,
    "lastUpdated": "2023-01-05T15:30:00Z"
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            serverError: {
              code: 500,
              description: 'Server Error',
              example: `{
  "success": false,
  "error": {
    "code": 500,
    "message": "Internal server error",
    "requestId": "req_123456789"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/me/transactions/summary',
          description: 'Get transaction summary statistics',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "walletId": "wallet_abc123def456",
    "period": "30_days",
    "summary": {
      "totalTransactions": 45,
      "totalVolume": 2500000.00,
      "totalFees": 12500.00,
      "netVolume": 2487500.00,
      "averageTransaction": 55555.56
    },
    "breakdown": {
      "deposits": {
        "count": 20,
        "volume": 1500000.00,
        "fees": 7500.00
      },
      "withdrawals": {
        "count": 15,
        "volume": 800000.00,
        "fees": 4000.00
      },
      "transfers": {
        "count": 10,
        "volume": 200000.00,
        "fees": 1000.00
      }
    },
    "currency": "UGX",
    "generatedAt": "2023-01-05T15:30:00Z"
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            badRequest: {
              code: 400,
              description: 'Bad Request',
              example: `{
  "success": false,
  "error": {
    "code": 400,
    "message": "Invalid request parameters",
    "details": "Invalid period parameter. Must be one of: 7_days, 30_days, 90_days"
  }
}`,
              color: 'text-yellow-600'
            }
          }
        }
      ]
    },
    {
      title: 'Transact APIs',
      description: 'Process various types of transactions including wallet-to-wallet, mobile money, and bank transfers',
      baseUrl: '/partner/v1/transactions',
      methods: [
        {
          method: 'POST',
          path: '/transact',
          description: 'Process a unified transaction',
          auth: 'API Key Required',
          request: {
            description: 'Transaction request payload',
            example: `{
  "mode": "WALLET_TO_WALLET",
  "amount": 50000,
  "currency": "UGX",
  "description": "Payment for services",
  "recipientUserId": "user_987654321",
  "externalReference": "ref_123456789",
  "metadata": {
    "source": "mobile_app",
    "version": "1.0.0"
  }
}`,
            requiredFields: [
              'mode',
              'amount', 
              'currency',
              'description'
            ],
            optionalFields: [
              'recipientUserId',
              'phoneNumber',
              'mnoProvider',
              'externalReference',
              'metadata'
            ]
          },
          responses: {
            success: {
              code: 201,
              description: 'Created',
              example: `{
  "success": true,
  "data": {
    "transactionId": "txn_abc123def456",
    "userId": "user_xyz789",
    "type": "TRANSFER",
    "mode": "WALLET_TO_WALLET",
    "amount": 50000,
    "currency": "UGX",
    "fee": 1500,
    "netAmount": 48500,
    "status": "COMPLETED",
    "direction": "DEBIT",
    "description": "Payment for services",
    "recipientUserId": "user_987654321",
    "createdAt": "2023-01-01T10:00:00Z",
    "updatedAt": "2023-01-01T10:05:00Z"
  }
}`,
              color: 'text-green-600'
            },
            pending: {
              code: 201,
              description: 'Created (Pending)',
              example: `{
  "success": true,
  "data": {
    "transactionId": "txn_abc123def456",
    "userId": "user_xyz789",
    "type": "TRANSFER",
    "mode": "WALLET_TO_MNO",
    "amount": 50000,
    "currency": "UGX",
    "fee": 2500,
    "netAmount": 47500,
    "status": "PENDING",
    "direction": "DEBIT",
    "description": "Mobile money transfer",
    "phoneNumber": "+256700000001",
    "mnoProvider": "MTN",
    "createdAt": "2023-01-01T10:00:00Z",
    "message": "Transaction is being processed"
  }
}`,
              color: 'text-yellow-600'
            },
            insufficientFunds: {
              code: 402,
              description: 'Payment Required',
              example: `{
  "success": false,
  "error": {
    "code": 402,
    "message": "Insufficient funds",
    "details": "Wallet balance is insufficient for this transaction. Available: 30000 UGX, Required: 50000 UGX"
  }
}`,
              color: 'text-red-600'
            },
            validationError: {
              code: 422,
              description: 'Unprocessable Entity',
              example: `{
  "success": false,
  "error": {
    "code": 422,
    "message": "Transaction validation failed",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be greater than 0"
      },
      {
        "field": "phoneNumber",
        "message": "Invalid phone number format for mobile money transaction"
      }
    ]
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/modes',
          description: 'Get available transaction modes',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "modes": [
      {
        "mode": "WALLET_TO_WALLET",
        "name": "Wallet to Wallet",
        "description": "Transfer funds between Rukapay wallets",
        "mandatoryFields": ["senderUserId", "recipientUserId", "amount", "currency"],
        "optionalFields": ["description", "externalReference"],
        "feeStructure": "Fixed: 1500 UGX"
      },
      {
        "mode": "WALLET_TO_MNO",
        "name": "Wallet to Mobile Money",
        "description": "Send funds from wallet to mobile money accounts",
        "mandatoryFields": ["userId", "amount", "phoneNumber", "mnoProvider"],
        "optionalFields": ["description", "externalReference"],
        "feeStructure": "Percentage: 2.5%"
      },
      {
        "mode": "MNO_TO_WALLET",
        "name": "Mobile Money to Wallet",
        "description": "Top up wallet from mobile money",
        "mandatoryFields": ["userId", "amount", "phoneNumber", "mnoProvider"],
        "optionalFields": ["description", "externalReference"],
        "feeStructure": "Free"
      }
    ],
    "supportedProviders": ["MTN", "AIRTEL", "AFRICELL"],
    "supportedCurrencies": ["UGX"]
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'POST',
          path: '/preview-fees',
          description: 'Preview transaction fees before processing',
          auth: 'API Key Required',
          request: {
            description: 'Fee preview request payload',
            example: `{
  "mode": "WALLET_TO_MNO",
  "amount": 50000,
  "currency": "UGX",
  "phoneNumber": "+256700000001",
  "mnoProvider": "MTN"
}`,
            requiredFields: [
              'mode',
              'amount',
              'currency'
            ],
            optionalFields: [
              'phoneNumber',
              'mnoProvider',
              'recipientUserId'
            ]
          },
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "transactionPreview": {
      "mode": "WALLET_TO_MNO",
      "amount": 50000,
      "currency": "UGX",
      "feeBreakdown": {
        "baseFee": 1000,
        "percentageFee": 1250,
        "totalFee": 2250
      },
      "netAmount": 47750,
      "recipientAmount": 50000,
      "feeStructure": "2.5% + 1000 UGX",
      "estimatedProcessingTime": "2-5 minutes"
    },
    "validated": true,
    "warnings": []
  }
}`,
              color: 'text-green-600'
            },
            validationError: {
              code: 422,
              description: 'Unprocessable Entity',
              example: `{
  "success": false,
  "error": {
    "code": 422,
    "message": "Invalid transaction parameters",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be between 1000 and 1000000 UGX"
      },
      {
        "field": "mnoProvider",
        "message": "Unsupported mobile money provider"
      }
    ]
  }
}`,
              color: 'text-red-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/my-transactions',
          description: 'Get user\'s transaction history',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "transactions": [
      {
        "transactionId": "txn_abc123def456",
        "type": "TRANSFER",
        "mode": "WALLET_TO_WALLET",
        "amount": 50000,
        "currency": "UGX",
        "fee": 1500,
        "netAmount": 48500,
        "status": "COMPLETED",
        "direction": "DEBIT",
        "description": "Payment for services",
        "recipientUserId": "user_987654321",
        "createdAt": "2023-01-01T10:00:00Z",
        "updatedAt": "2023-01-01T10:05:00Z"
      },
      {
        "transactionId": "txn_def456ghi789",
        "type": "DEPOSIT",
        "mode": "MNO_TO_WALLET",
        "amount": 100000,
        "currency": "UGX",
        "fee": 0,
        "netAmount": 100000,
        "status": "COMPLETED",
        "direction": "CREDIT",
        "description": "Mobile money top-up",
        "phoneNumber": "+256700000001",
        "mnoProvider": "MTN",
        "createdAt": "2023-01-01T09:30:00Z",
        "updatedAt": "2023-01-01T09:35:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    },
    "summary": {
      "totalTransactions": 45,
      "totalVolume": 2500000,
      "totalFees": 12500,
      "netVolume": 2487500
    }
  }
}`,
              color: 'text-green-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            },
            badRequest: {
              code: 400,
              description: 'Bad Request',
              example: `{
  "success": false,
  "error": {
    "code": 400,
    "message": "Invalid request parameters",
    "details": "Invalid page parameter. Must be a positive integer"
  }
}`,
              color: 'text-yellow-600'
            }
          }
        },
        {
          method: 'POST',
          path: '/validate',
          description: 'Validate transaction before processing',
          auth: 'API Key Required',
          request: {
            description: 'Transaction validation request payload',
            example: `{
  "mode": "WALLET_TO_WALLET",
  "amount": 50000,
  "currency": "UGX",
  "recipientUserId": "user_987654321",
  "description": "Payment for services"
}`,
            requiredFields: [
              'mode',
              'amount',
              'currency'
            ],
            optionalFields: [
              'recipientUserId',
              'phoneNumber',
              'mnoProvider',
              'description'
            ]
          },
          responses: {
            valid: {
              code: 200,
              description: 'Valid',
              example: `{
  "success": true,
  "data": {
    "valid": true,
    "validationResults": {
      "amount": {
        "valid": true,
        "message": "Amount is within acceptable range"
      },
      "recipient": {
        "valid": true,
        "message": "Recipient wallet exists and is active"
      },
      "balance": {
        "valid": true,
        "message": "Sufficient balance available",
        "availableBalance": 150000,
        "requiredAmount": 50000
      },
      "limits": {
        "valid": true,
        "message": "Transaction within daily limits"
      }
    },
    "estimatedFee": 1500,
    "netAmount": 48500,
    "estimatedProcessingTime": "Instant"
  }
}`,
              color: 'text-green-600'
            },
            invalid: {
              code: 422,
              description: 'Unprocessable Entity',
              example: `{
  "success": false,
  "data": {
    "valid": false,
    "validationResults": {
      "amount": {
        "valid": false,
        "message": "Amount exceeds maximum limit of 1000000 UGX"
      },
      "recipient": {
        "valid": false,
        "message": "Recipient wallet not found or inactive"
      },
      "balance": {
        "valid": false,
        "message": "Insufficient balance",
        "availableBalance": 30000,
        "requiredAmount": 50000
      },
      "limits": {
        "valid": false,
        "message": "Transaction exceeds daily limit of 500000 UGX"
      }
    },
    "errors": [
      "Amount exceeds maximum limit",
      "Recipient wallet not found",
      "Insufficient balance",
      "Daily limit exceeded"
    ]
  }
}`,
              color: 'text-red-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            }
          }
        }
      ]
    },
    {
      title: 'Bulk Transactions',
      description: 'Process multiple transactions in a single batch for efficiency',
      baseUrl: '/partner/v1/transactions/bulk',
      methods: [
        {
          method: 'POST',
          path: '/',
          description: 'Create a new bulk transaction batch',
          auth: 'API Key Required',
          request: {
            description: 'Bulk transaction batch creation payload',
            example: `{
  "mode": "WALLET_TO_MNO",
  "currency": "UGX",
  "description": "Monthly salary payments",
  "batchReference": "salary_payment_2024_01",
  "items": [
    {
      "itemId": "emp_001",
      "amount": 500000,
      "description": "Salary - John Doe",
      "phoneNumber": "+256700000001",
      "mnoProvider": "MTN",
      "externalReference": "emp_001_jan_2024"
    },
    {
      "itemId": "emp_002", 
      "amount": 450000,
      "description": "Salary - Jane Smith",
      "phoneNumber": "+256700000002",
      "mnoProvider": "AIRTEL",
      "externalReference": "emp_002_jan_2024"
    }
  ]
}`,
            requiredFields: [
              'mode',
              'currency',
              'description',
              'items'
            ],
            optionalFields: [
              'batchReference',
              'metadata'
            ]
          },
          responses: {
            success: {
              code: 201,
              description: 'Created',
              example: `{
  "success": true,
  "data": {
    "batchId": "batch_abc123def456",
    "userId": "user_xyz789",
    "batchReference": "salary_payment_2024_01",
    "mode": "WALLET_TO_MNO",
    "currency": "UGX",
    "description": "Monthly salary payments",
    "status": "PROCESSING",
    "totalItems": 25,
    "totalAmount": 12500000,
    "totalFees": 312500,
    "netAmount": 12187500,
    "processedItems": 0,
    "failedItems": 0,
    "pendingItems": 25,
    "createdAt": "2023-01-01T10:00:00Z",
    "estimatedCompletionTime": "2023-01-01T10:15:00Z",
    "items": [
      {
        "itemId": "item_001",
        "referenceId": "emp_001",
        "amount": 500000,
        "description": "Salary - John Doe",
        "phoneNumber": "+256700000001",
        "mnoProvider": "MTN",
        "status": "PENDING"
      }
    ]
  }
}`,
              color: 'text-green-600'
            },
            validationError: {
              code: 422,
              description: 'Unprocessable Entity',
              example: `{
  "success": false,
  "error": {
    "code": 422,
    "message": "Bulk transaction validation failed",
    "details": [
      {
        "itemIndex": 0,
        "field": "amount",
        "message": "Amount must be greater than 0"
      },
      {
        "itemIndex": 1,
        "field": "phoneNumber",
        "message": "Invalid phone number format"
      }
    ],
    "validItems": 23,
    "invalidItems": 2
  }
}`,
              color: 'text-red-600'
            },
            tooLarge: {
              code: 413,
              description: 'Payload Too Large',
              example: `{
  "success": false,
  "error": {
    "code": 413,
    "message": "Batch size exceeds limit",
    "details": "Maximum batch size is 100 items. Provided: 150 items"
  }
}`,
              color: 'text-red-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'GET',
          path: '/:batchId/status',
          description: 'Get bulk transaction status',
          auth: 'API Key Required',
          responses: {
            success: {
              code: 200,
              description: 'Success',
              example: `{
  "success": true,
  "data": {
    "batchId": "batch_abc123def456",
    "userId": "user_xyz789",
    "batchReference": "salary_payment_2024_01",
    "mode": "WALLET_TO_MNO",
    "currency": "UGX",
    "description": "Monthly salary payments",
    "status": "COMPLETED",
    "totalItems": 25,
    "totalAmount": 12500000,
    "totalFees": 312500,
    "netAmount": 12187500,
    "processedItems": 25,
    "failedItems": 0,
    "pendingItems": 0,
    "createdAt": "2023-01-01T10:00:00Z",
    "completedAt": "2023-01-01T10:12:00Z",
    "processingTime": "12 minutes",
    "summary": {
      "successRate": "100%",
      "averageProcessingTime": "28 seconds",
      "totalFeesPaid": 312500
    },
    "itemStatuses": [
      {
        "itemId": "item_001",
        "referenceId": "emp_001",
        "amount": 500000,
        "status": "COMPLETED",
        "transactionId": "txn_item001_abc123",
        "processedAt": "2023-01-01T10:01:00Z"
      }
    ]
  }
}`,
              color: 'text-green-600'
            },
            notFound: {
              code: 404,
              description: 'Not Found',
              example: `{
  "success": false,
  "error": {
    "code": 404,
    "message": "Batch not found",
    "details": "The specified batch ID does not exist or is not accessible"
  }
}`,
              color: 'text-red-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            }
          }
        },
        {
          method: 'POST',
          path: '/validate',
          description: 'Validate bulk transaction batch',
          auth: 'API Key Required',
          request: {
            description: 'Bulk transaction validation request payload',
            example: `{
  "mode": "WALLET_TO_MNO",
  "currency": "UGX",
  "description": "Monthly salary payments",
  "items": [
    {
      "itemId": "emp_001",
      "amount": 500000,
      "phoneNumber": "+256700000001",
      "mnoProvider": "MTN"
    },
    {
      "itemId": "emp_002",
      "amount": 450000,
      "phoneNumber": "+256700000002",
      "mnoProvider": "AIRTEL"
    }
  ]
}`,
            requiredFields: [
              'mode',
              'currency',
              'items'
            ],
            optionalFields: [
              'description',
              'batchReference'
            ]
          },
          responses: {
            valid: {
              code: 200,
              description: 'Valid',
              example: `{
  "success": true,
  "data": {
    "valid": true,
    "batchValidation": {
      "totalItems": 25,
      "validItems": 25,
      "invalidItems": 0,
      "totalAmount": 12500000,
      "estimatedFees": 312500,
      "netAmount": 12187500
    },
    "itemValidations": [
      {
        "itemIndex": 0,
        "valid": true,
        "amount": 500000,
        "estimatedFee": 12500,
        "netAmount": 487500,
        "validationResults": {
          "amount": "Valid",
          "recipient": "Valid",
          "phoneNumber": "Valid",
          "mnoProvider": "Valid"
        }
      }
    ],
    "summary": {
      "allItemsValid": true,
      "estimatedProcessingTime": "10-15 minutes",
      "recommendedBatchSize": "Optimal"
    }
  }
}`,
              color: 'text-green-600'
            },
            invalid: {
              code: 422,
              description: 'Unprocessable Entity',
              example: `{
  "success": false,
  "data": {
    "valid": false,
    "batchValidation": {
      "totalItems": 25,
      "validItems": 20,
      "invalidItems": 5,
      "totalAmount": 10000000,
      "estimatedFees": 250000,
      "netAmount": 9750000
    },
    "itemValidations": [
      {
        "itemIndex": 0,
        "valid": false,
        "amount": 0,
        "errors": [
          "Amount must be greater than 0"
        ]
      },
      {
        "itemIndex": 1,
        "valid": false,
        "amount": 500000,
        "errors": [
          "Invalid phone number format",
          "Unsupported mobile money provider"
        ]
      }
    ],
    "summary": {
      "allItemsValid": false,
      "validationErrors": [
        "5 items have validation errors",
        "Batch contains invalid phone numbers",
        "Some amounts are invalid"
      ]
    }
  }
}`,
              color: 'text-red-600'
            },
            unauthorized: {
              code: 401,
              description: 'Unauthorized',
              example: `{
  "success": false,
  "error": {
    "code": 401,
    "message": "Invalid or missing API key",
    "details": "Please provide a valid API key in the Authorization header"
  }
}`,
              color: 'text-red-600'
            }
          }
        }
      ]
    }
  ]

  const codeExamples = {
    authentication: {
      title: 'Authentication',
      description: 'All requests require an API key in the Authorization header',
      code: `curl -X GET "https://api.rukapay.co.ug/partner/v1/wallet/me" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json"`
    },
    walletRequest: {
      title: 'Get Wallet Information',
      description: 'Retrieve wallet details for a user',
      code: `curl -X GET "https://api.rukapay.co.ug/partner/v1/wallet/me?userId=user_123456789" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json"`
    },
    transactionRequest: {
      title: 'Process Transaction',
      description: 'Send funds from wallet to mobile money',
      code: `curl -X POST "https://api.rukapay.co.ug/partner/v1/transactions/transact" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123456789",
    "mode": "WALLET_TO_MNO",
    "amount": 50000,
    "currency": "UGX",
    "description": "Payment for services",
    "phoneNumber": "+256700000001",
    "mnoProvider": "MTN"
  }'`
    },
    bulkTransactionRequest: {
      title: 'Bulk Transaction',
      description: 'Process multiple transactions in a single batch',
      code: `curl -X POST "https://api.rukapay.co.ug/partner/v1/transactions/bulk" \\
  -H "Authorization: Bearer ak_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123456789",
    "batchReference": "salary_payment_2024_01",
    "mode": "WALLET_TO_MNO",
    "currency": "UGX",
    "description": "Monthly salary payments",
    "items": [
      {
        "referenceId": "emp_001",
        "amount": 500000,
        "description": "Salary - John Doe",
        "phoneNumber": "+256700000001",
        "mnoProvider": "MTN"
      }
    ]
  }'`
    }
  }

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-secondary-600" />,
      title: 'Secure API Keys',
      description: 'Bank-grade security with encrypted API keys and comprehensive access controls'
    },
    {
      icon: <Zap className="h-6 w-6 text-secondary-600" />,
      title: 'Real-Time Processing',
      description: 'Instant transaction processing with real-time status updates and webhooks'
    },
    {
      icon: <Users className="h-6 w-6 text-secondary-600" />,
      title: 'Partner Management',
      description: 'Comprehensive partner account management with granular permissions'
    },
    {
      icon: <Code className="h-6 w-6 text-secondary-600" />,
      title: 'Developer Friendly',
      description: 'RESTful APIs with comprehensive documentation and SDKs'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner API
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Comprehensive APIs for wallet management, transaction processing, and bulk operations. 
              Designed specifically for third-party partners and integrators.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="relative inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg opacity-50 cursor-not-allowed">
                  Try Sandbox
                  <span className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for scale, security, and developer experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Wallet APIs Section */}
      <section id="external-wallet-apis" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">External Wallet APIs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              APIs for external partners to manage wallets, check balances, and view transaction summaries
            </p>
          </div>
          <div className="space-y-8">
            {endpoints.filter(endpoint => endpoint.title === 'External Wallet APIs').map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Transact APIs Section */}
      <section id="transact-apis" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transact APIs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Process various transaction types including wallet-to-wallet, mobile money, and bank transfers
            </p>
          </div>
          <div className="space-y-8">
            {endpoints.filter(endpoint => endpoint.title === 'Transact APIs').map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Operations Section */}
      <section id="bulk-operations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bulk Operations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Efficiently process multiple transactions in a single batch for payroll and bulk payments
            </p>
          </div>
          <div className="space-y-8">
            {endpoints.filter(endpoint => endpoint.title === 'Bulk Transactions').map((endpoint, index) => (
              <EndpointCard key={index} {...endpoint} />
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Code Examples</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started quickly with these practical examples
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(codeExamples).map(([key, example]) => (
              <CodeExample key={key} {...example} />
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transaction Modes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive support for various transaction types with clear requirements and examples
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Wallet to Wallet',
                description: 'Transfer funds between Rukapay wallets',
                mandatoryFields: ['senderUserId', 'recipientUserId', 'amount', 'currency'],
                status: 'active'
              },
              {
                name: 'Wallet to Mobile Money',
                description: 'Send funds from wallet to mobile money accounts',
                mandatoryFields: ['userId', 'amount', 'phoneNumber', 'mnoProvider'],
                status: 'active'
              },
              {
                name: 'Mobile Money to Wallet',
                description: 'Top up wallet from mobile money',
                mandatoryFields: ['userId', 'amount', 'phoneNumber', 'mnoProvider'],
                status: 'active'
              },
              {
                name: 'Bank Transfer',
                description: 'Transfer funds to bank accounts',
                mandatoryFields: ['userId', 'amount', 'bankCode', 'accountNumber'],
                status: 'beta'
              },
              {
                name: 'Merchant Payment',
                description: 'Pay merchants and service providers',
                mandatoryFields: ['userId', 'amount', 'merchantId', 'description'],
                status: 'active'
              },
              {
                name: 'Wallet Top-up',
                description: 'Add funds to wallet from external sources',
                mandatoryFields: ['userId', 'amount', 'paymentMethod', 'currency'],
                status: 'active'
              }
            ].map((transaction, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{transaction.name}</h3>
                  <span className={`status-badge ${
                    transaction.status === 'active' ? 'status-success' : 'status-warning'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{transaction.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Mandatory Fields:</h4>
                  <div className="flex flex-wrap gap-2">
                    {transaction.mandatoryFields.map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/transaction-modes"
                  className="inline-flex items-center text-primary-950 hover:text-primary-800 font-medium mt-4 text-sm"
                >
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/transaction-modes"
              className="inline-flex items-center px-6 py-3 bg-primary-950 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200"
            >
              View Complete Transaction Modes Guide
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Integrate?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Start building with our Partner API today. Get your API keys and begin integration in minutes.
          </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-white text-primary-950 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get API Keys
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div className="relative inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg opacity-50 cursor-not-allowed">
                  Try Sandbox
                  <span className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
        </div>
      </section>
    </div>
  )
}

export default PartnerApiPage
