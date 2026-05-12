import apiClient from "../apiClient";

export async function removeUserBoardService(
  boardId: string,
  userId: string,
): Promise<void> {
  await apiClient.patch(`board/remove/${boardId}`, {
    userId,
  });

  return;
}
