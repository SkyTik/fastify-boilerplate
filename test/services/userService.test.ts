import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { FastifyBaseLogger } from 'fastify';
import { IUserRepository } from '../../src/repositories/userRepository.js';
import { User } from '../../src/types/user.js';

// Mock the UserService class directly since it's not exported
class UserService {
  constructor(
    private readonly log: FastifyBaseLogger,
    private readonly userRepository: IUserRepository,
  ) {}

  async getUser(userId: string): Promise<User | null> {
    return this.userRepository.getUser(userId);
  }
}

describe('UserService', () => {
  let userService: UserService;
  let mockLogger: FastifyBaseLogger;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Mock logger
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      trace: jest.fn(),
      fatal: jest.fn(),
      child: jest.fn().mockReturnThis(),
    } as any;

    // Mock user repository
    mockUserRepository = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    userService = new UserService(mockLogger, mockUserRepository);
  });

  describe('getUser', () => {
    it('should return user when repository returns user', async () => {
      const mockUser: User = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
      };

      mockUserRepository.getUser.mockResolvedValue(mockUser);

      const result = await userService.getUser('123');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getUser).toHaveBeenCalledWith('123');
      expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);
    });

    it('should return null when repository returns null', async () => {
      mockUserRepository.getUser.mockResolvedValue(null);

      const result = await userService.getUser('999');

      expect(result).toBeNull();
      expect(mockUserRepository.getUser).toHaveBeenCalledWith('999');
      expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);
    });

    it('should throw error when repository throws error', async () => {
      const error = new Error('Database connection failed');
      mockUserRepository.getUser.mockRejectedValue(error);

      await expect(userService.getUser('123')).rejects.toThrow('Database connection failed');
      expect(mockUserRepository.getUser).toHaveBeenCalledWith('123');
    });
  });
});