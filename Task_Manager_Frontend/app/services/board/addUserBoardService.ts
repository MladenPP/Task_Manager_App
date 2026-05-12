import apiClient from "../apiClient";

export async function addUserBoardService(
  boardId: string,
  userId: string,
): Promise<void> {
  await apiClient.patch(`board/add/${boardId}`, {
    userId,
  });

  return;
}
